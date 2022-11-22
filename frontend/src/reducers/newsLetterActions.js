import { get, post, put, remove } from "../utils/serverCall";

export const subscribeToNewsletter = async (newsLetterData) => {
  try {
    const addNewsLetterResult = await post(`/campaign/audience/add/member`, newsLetterData)
    return addNewsLetterResult;
  } catch (e) {
    throw e
  }
}
