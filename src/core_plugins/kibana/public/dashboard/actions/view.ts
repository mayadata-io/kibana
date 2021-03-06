/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { createAction } from 'redux-actions';
import { Filters, Query, TimeRange } from 'ui/embeddable';
import { KibanaAction } from '../../selectors/types';
import { DashboardViewMode } from '../dashboard_view_mode';
import { PanelId } from '../selectors';

export enum ViewActionTypeKeys {
  UPDATE_VIEW_MODE = 'UPDATE_VIEW_MODE',
  SET_VISIBLE_CONTEXT_MENU_PANEL_ID = 'SET_VISIBLE_CONTEXT_MENU_PANEL_ID',
  MAXIMIZE_PANEl = 'MAXIMIZE_PANEl',
  MINIMIZE_PANEL = 'MINIMIZE_PANEL',
  UPDATE_IS_FULL_SCREEN_MODE = 'UPDATE_IS_FULL_SCREEN_MODE',
  UPDATE_USE_MARGINS = 'UPDATE_USE_MARGINS',
  UPDATE_HIDE_PANEL_TITLES = 'UPDATE_HIDE_PANEL_TITLES',
  UPDATE_TIME_RANGE = 'UPDATE_TIME_RANGE',
  UPDATE_FILTERS = 'UPDATE_FILTERS',
  UPDATE_QUERY = 'UPDATE_QUERY',
}

export interface UpdateViewModeAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_VIEW_MODE, DashboardViewMode> {}

export interface SetVisibleContextMenuPanelIdAction
  extends KibanaAction<ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID, PanelId> {}

export interface MaximizePanelAction
  extends KibanaAction<ViewActionTypeKeys.MAXIMIZE_PANEl, PanelId> {}

export interface MinimizePanelAction
  extends KibanaAction<ViewActionTypeKeys.MINIMIZE_PANEL, undefined> {}

export interface UpdateIsFullScreenModeAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE, boolean> {}

export interface UpdateUseMarginsAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_USE_MARGINS, boolean> {}

export interface UpdateHidePanelTitlesAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES, boolean> {}

export interface UpdateTimeRangeAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_TIME_RANGE, TimeRange> {}

export interface UpdateFiltersAction
  extends KibanaAction<ViewActionTypeKeys.UPDATE_FILTERS, Filters> {}

export interface UpdateQueryAction extends KibanaAction<ViewActionTypeKeys.UPDATE_QUERY, Query> {}

export type ViewActions =
  | UpdateViewModeAction
  | SetVisibleContextMenuPanelIdAction
  | MaximizePanelAction
  | MinimizePanelAction
  | UpdateIsFullScreenModeAction
  | UpdateUseMarginsAction
  | UpdateHidePanelTitlesAction
  | UpdateTimeRangeAction
  | UpdateFiltersAction
  | UpdateQueryAction;

export const updateViewMode = createAction<string>(ViewActionTypeKeys.UPDATE_VIEW_MODE);
export const setVisibleContextMenuPanelId = createAction<PanelId>(
  ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID
);
export const maximizePanel = createAction<PanelId>(ViewActionTypeKeys.MAXIMIZE_PANEl);
export const minimizePanel = createAction(ViewActionTypeKeys.MINIMIZE_PANEL);
export const updateIsFullScreenMode = createAction<boolean>(
  ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE
);
export const updateUseMargins = createAction<boolean>(ViewActionTypeKeys.UPDATE_USE_MARGINS);
export const updateHidePanelTitles = createAction<boolean>(
  ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES
);
export const updateTimeRange = createAction<TimeRange>(ViewActionTypeKeys.UPDATE_TIME_RANGE);
export const updateFilters = createAction<Filters>(ViewActionTypeKeys.UPDATE_FILTERS);
export const updateQuery = createAction<Query>(ViewActionTypeKeys.UPDATE_QUERY);
