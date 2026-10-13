import { useSyncExternalStore } from 'react'
import { SERVER_STATE, getConsentState, hasConsentIn, subscribe } from './consentStore.js'

const getServerState = () => SERVER_STATE

/**
 * Stato del consenso; i componenti si aggiornano a ogni scelta. Nel pre-rendering e durante
 * l'idratazione vale SERVER_STATE (nessun consenso, nessun banner), poi lo stato reale.
 */
export function useConsentState() {
  return useSyncExternalStore(subscribe, getConsentState, getServerState)
}

/** True se il visitatore ha accettato la categoria ('necessary' è sempre true). */
export function useHasConsent(category) {
  return hasConsentIn(useConsentState(), category)
}
