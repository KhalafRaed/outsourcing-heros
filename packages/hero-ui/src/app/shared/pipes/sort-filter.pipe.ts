import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sortAndFilter',
  pure: true,
  standalone: true,
})
export class SortFilterPipe implements PipeTransform {
  transform(items: any[], filter: string, sortKey: string): any[] {
    // Filter items based on the filter string
    let filteredItems = items.filter((item) =>
      item.email.toLowerCase().includes(filter.toLowerCase())
    )

    // Sort items based on the sort key
    filteredItems = filteredItems.sort((a, b) => {
      const valA = a[sortKey].toLowerCase()
      const valB = b[sortKey].toLowerCase()
      return valA.localeCompare(valB)
    })

    return filteredItems
  }
}
