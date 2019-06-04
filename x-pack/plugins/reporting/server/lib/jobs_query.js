/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { get } from 'lodash';
import { QUEUE_DOCTYPE } from '../../common/constants';
import { oncePerServer } from './once_per_server';

const defaultSize = 10;

function jobsQueryFn(server) {
  const index = server.config().get('xpack.reporting.index');
  const { callWithInternalUser, errors: esErrors } = server.plugins.elasticsearch.getCluster('admin');

  function getUsername(user) {
    return get(user, 'username', false);
  }

  function execQuery(type, body) {
    const defaultBody = {
      search: {
        _source: {
          excludes: [ 'output.content' ]
        },
        sort: [
          { created_at: { order: 'desc' } }
        ],
        size: defaultSize,
      }
    };

    const query = {
      index: `${index}-*`,
      type: QUEUE_DOCTYPE,
      body: Object.assign(defaultBody[type] || {}, body)
    };

    return callWithInternalUser(type, query)
      .catch((err) => {
        if (err instanceof esErrors['401']) return;
        if (err instanceof esErrors['403']) return;
        if (err instanceof esErrors['404']) return;
        throw err;
      });
  }

  function getHits(query) {
    return query.then((res) => get(res, 'hits.hits', []));
  }

  return {
    list(jobTypes, user, page = 0, size = defaultSize, jobIds, usernameFromCookie) {
      const username = getUsername(user);

      if (!usernameFromCookie) {
        usernameFromCookie = "invalid";
      }
      // console.log("list - username", usernameFromCookie)

      const body = {
        size,
        from: size * page,
        query: {
          constant_score: {
            filter: {
              bool: {
                must: [
                  { terms: { jobtype: jobTypes } },
                  { term: { created_by: username } },
                  { term: { indexpatternid: usernameFromCookie } },
                  // not using prefix or regexp as cookie can be edited or passing the header externally
                  // as single character only will also take all the users starting with that character.
                  // suppose header as "username: t" will list jobs of all the users (username) starting
                  // with t
                  // { prefix: { indexpatternid: '41bccb50' } },
                ]
              }
            }
          }
        },
      };

      if (jobIds) {
        body.query.constant_score.filter.bool.must.push({
          ids: { type: QUEUE_DOCTYPE, values: jobIds }
        });
      }

      return getHits(execQuery('search', body));
    },

    count(jobTypes, user, usernameFromCookie) {
      const username = getUsername(user);

      if (!usernameFromCookie) {
        usernameFromCookie = "invalid";
      }
      // console.log("count - username", usernameFromCookie)

      const body = {
        query: {
          constant_score: {
            filter: {
              bool: {
                must: [
                  { terms: { jobtype: jobTypes } },
                  { term: { created_by: username } },
                  { term: { indexpatternid: usernameFromCookie } },
                  // { prefix: { indexpatternid: 'testabc' } },
                ]
              }
            }
          }
        }
      };

      return execQuery('count', body)
        .then((doc) => {
          if (!doc) return 0;
          return doc.count;
        });
    },

    get(user, id, opts = {}, usernameFromCookie) {
      if (!id) return Promise.resolve();

      const username = getUsername(user);

      if (!usernameFromCookie) {
        usernameFromCookie = "invalid";
      }
      // console.log("get - username", usernameFromCookie)

      const body = {
        query: {
          constant_score: {
            filter: {
              bool: {
                must: [
                  { term: { _id: id } },
                  { term: { created_by: username } },
                  { term: { indexpatternid: usernameFromCookie } },
                  // { prefix: { indexpatternid: 'testabc' } },
                ],
              }
            }
          }
        },
        size: 1,
      };

      if (opts.includeContent) {
        body._source = {
          excludes: []
        };
      }

      return getHits(execQuery('search', body))
        .then((hits) => {
          if (hits.length !== 1) return;
          return hits[0];
        });
    }
  };
}

export const jobsQueryFactory = oncePerServer(jobsQueryFn);
