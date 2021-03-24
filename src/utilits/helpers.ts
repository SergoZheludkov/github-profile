export const getError = (status: number) => {
  switch (status) {
    case 401:
      return 'Invalid token';

    case 500:
      return 'Server Error';

    default:
      return 'Unknown error';
  }
};
