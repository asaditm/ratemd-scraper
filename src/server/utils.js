export function safelyParseJSON(json) {
  if (!json) {
    return '';
  }
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log('Could not parse JSON', json, err);
  }
}

export function createHttpError(message, data) {
  return {
    status: 'error',
    data,
    message
  };
}
