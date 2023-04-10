import { createAuth0 } from '@auth0/auth0-vue'
import { domain, clientId } from '../../auth_config.json'

const DEFAULT_REDIRECT_CALLBACK = (): string =>
  (window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  ) as unknown as string) || ''

export default () =>
  createAuth0({
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: DEFAULT_REDIRECT_CALLBACK()
    }
  })
