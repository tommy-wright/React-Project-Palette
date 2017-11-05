import {searchGitHubProject, getProjectPalette} from '../utils/requests';

import {
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_PROJECT_URL,
  COLOR_DETAIL,
  CLEAR_COLOR,
  SET_PALETTE,
  ERROR,
  CLEAR_ERROR,
} from './actionTypes';

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
