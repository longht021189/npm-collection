export enum Status {
  Unknown,
  Installing,
  Waiting,
  Active,
}

const setup = async ({ path, scope }: { path: string; scope: string }): Promise<Status> => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register(path, {
      scope,
    })
    if (registration.installing != null) {
      return Status.Installing
    } else if (registration.waiting != null) {
      return Status.Waiting
    } else if (registration.active != null) {
      return Status.Active
    }
  }
  return Status.Unknown
}

export default setup
