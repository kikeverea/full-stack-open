const identityFunction = arg => arg

const actions = ({
  setAllDownstream = identityFunction,
  addDownstream = identityFunction,
  updateDownstream = identityFunction,
  removeDownstream = identityFunction
} =
{
  setAllDownstream: identityFunction,
  addDownstream: identityFunction,
  updateDownstream: identityFunction,
  removeDownstream: identityFunction
}) =>
{
  return {
    setAll(state, action) {
      return setAllDownstream(action.payload)
    },
    add(state, action) {
      return addDownstream(state.concat(action.payload))
    },
    update(state, action) {
      const toUpdate = action.payload
      const updated = state.map(blog => blog.id === toUpdate.id ? toUpdate : blog)
      return updateDownstream(updated)
    },
    remove(state, action) {
      const toDelete = action.payload
      return removeDownstream(state.filter(blog => blog.id !== toDelete.id))
    }
  }
}

export default actions
