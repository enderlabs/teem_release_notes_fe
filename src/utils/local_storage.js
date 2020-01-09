// import * as Sentry from '@sentry/browser';

export const updateTeemData = (key, value) => {
  const teemData = localStorage.getItem('teem') ? JSON.parse(localStorage.getItem('teem')) : {};
  if (value && value !== teemData[key]) {
    teemData[key] = value;
    localStorage.setItem('teem', JSON.stringify(teemData));
  }
  if (!value) {
    if (key in teemData) {
      delete teemData[key];
      localStorage.setItem('teem', JSON.stringify(teemData));
    }
  }
};

export const getTeemData = (key) => {
  try {
    const teemData = JSON.parse(localStorage.getItem('teem'));
    console.log('------')
    console.log(teemData);
    return teemData[key] || null;
  } catch {
    return null;
  }
};

export const clearData = () => {
  try {
    localStorage.removeItem('teem');
    return true;
  } catch (error) {
    console.error('Error clearing storage:', { error });
    // Sentry.captureException(error);
    return false;
  }
};
