export default function (
  pagination = { page: 1, itemsPerPage: 10 },
  count: number
) {
  const skip =
    pagination.page == 1 ? 0 : (pagination.page - 1) * pagination.itemsPerPage

  // handle 'all' option in pagination
  const take = pagination.itemsPerPage > 0 ? pagination.itemsPerPage : count
  return { skip, take }
}
