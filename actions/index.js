import * as types from './types'

/**
 * Updates the current page
 *
 * @param page The next page to display
 *
 * @return An action object with type and the new page
 */
export const updatePage = (page) => ({
    type: types.UPDATE_PAGE,
    page: page,
});
