import { users } from '../data/users';

// For MVP, assume single user = first user in list
let currentUser = users[0];

export function getCurrentUser() {
  return currentUser;
}

export function updateCurrentUser(patch: Partial<typeof currentUser>) {
  currentUser = { ...currentUser, ...patch };
  return currentUser;
}
