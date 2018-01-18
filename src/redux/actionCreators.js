import {
  searchGitHubProject,
  getProjectPalette,
} from 'utils/requests';

import {
  updateQueryParams,
  deleteQueryParams,
} from 'utils/history';

import {
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_PROJECT_URL,
  COLOR_DETAIL,
  CLEAR_COLOR,
  SET_PALETTE,
  ERROR,
  CLEAR_ERROR,
  UPDATE_FORM_FIELD,
  SHOW_INFO_FIELDS,
  SHOW_URL_FIELDS,
  UPDATE_FILTER_TEXT,
  UPDATE_FILTER_SELECT,
  ENABLE_FILTER_SELECT,
  DISABLE_FILTER_SELECT,
  UPDATE_SORT_SELECT,
  UPDATE_SORT_ORDER,
} from 'redux/actionTypes';

export const setIsLoading = () => ({
  type: IS_LOADING,
});

export const setIsNotLoading = () => ({
  type: IS_NOT_LOADING,
});

export const setProjectUrl = text => ({
  type: UPDATE_PROJECT_URL,
  text,
});

export const openColorDetail = color => ({
  type: COLOR_DETAIL,
  color,
});

export const closeColorDetail = () => ({
  type: CLEAR_COLOR,
});

export const setError = message => ({
  type: ERROR,
  message,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setColorPalette = palette => ({
  type: SET_PALETTE,
  palette,
});

export const asyncFetchColorPalette = search => dispatch => {
  dispatch(setIsLoading());

  return searchGitHubProject(search)
    .then(response => {
      dispatch(setProjectUrl(response.data.html_url));
      return {
        httpsCloneURL: response.data.clone_url,
        repoURI: response.data.full_name,
      };
    })
    .then(getProjectPalette)
    .then(response => {
      dispatch(setColorPalette(response.data));
    })
    .catch(error => {
      dispatch(setError(error));
    })
    .then(() => {
      dispatch(setIsNotLoading());
    });
};

export const updateFormField = (field, value) => ({
  type: UPDATE_FORM_FIELD,
  field,
  value,
});

export const showInfoFields = () => ({type: SHOW_INFO_FIELDS});

export const showUrlFields = () => ({type: SHOW_URL_FIELDS});

export const updateFilterText = value => dispatch => {
  if (!value.length) {
    deleteQueryParams(['search']);
  } else {
    updateQueryParams({search: value});
  }

  dispatch({
    type: UPDATE_FILTER_TEXT,
    value,
  });
};

export const updateFilterSelect = value => dispatch => {
  updateQueryParams({filter: value});

  dispatch({
    type: ENABLE_FILTER_SELECT,
  });

  dispatch({
    type: UPDATE_FILTER_SELECT,
    value,
  });
};

export const enableFilterSelect = value => dispatch => {
  if (value) {
    updateQueryParams({filter: value});
  }

  dispatch({
    type: ENABLE_FILTER_SELECT,
  });
};

export const disableFilterSelect = () => dispatch => {
  deleteQueryParams(['filter']);

  dispatch({
    type: DISABLE_FILTER_SELECT,
  });
};

export const updateSortSelect = value => dispatch => {
  updateQueryParams({sort: value});

  dispatch({
    type: UPDATE_SORT_SELECT,
    value,
  });
};

export const updateSortOrder = value => dispatch => {
  updateQueryParams({order: value});

  dispatch({
    type: UPDATE_SORT_ORDER,
    value,
  });
};
