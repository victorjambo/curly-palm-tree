export function extractUsername(inputString) {
  // Define a regular expression to match usernames starting with @
  const regex = /@(\w+)/;

  // Use the `match` method to find the username in the string
  const match = inputString.match(regex);

  // Check if a match was found
  if (match && match[1]) {
    // Extract the username (the part after the @ symbol)
    const username = match[1];
    return username;
  } else {
    // Return null if no username is found
    return null;
  }
}
