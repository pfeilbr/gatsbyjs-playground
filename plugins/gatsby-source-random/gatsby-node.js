exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  const items = [
    {
      id: 0,
      name: "car",
    },
    {
      id: 1,
      name: "truck",
    },
  ]

  const processItem = item => {
    const nodeId = createNodeId(`random-item-${item.id}`)
    const nodeContent = JSON.stringify(item)
    const nodeData = Object.assign({}, item, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `RandomItem`,
        content: nodeContent,
        contentDigest: createContentDigest(item),
      },
    })
    return nodeData
  }

  items.forEach(item => createNode(processItem(item)))

  // plugin code goes here...
  console.log("Testing my plugin", configOptions)
}
