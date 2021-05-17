import { Connectivity } from '@nativescript/core'


export function isOnline() {
  const type = Connectivity.getConnectionType();
  return type !== Connectivity.connectionType.none;
}
