export const getFriendEmail = (userEmails: string[], loginUserEmail: string) =>
  userEmails.filter(
    (userEmail) => loginUserEmail != null && userEmail !== loginUserEmail
  )[0];
