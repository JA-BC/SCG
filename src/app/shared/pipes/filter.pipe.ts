import { Pipe, PipeTransform } from "@angular/core";
import { TPairs } from "src/app/core/interfaces/type";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<unknown>, filter: TPairs<string>): any {
    if (!items || !filter?.value) {
      return items;
    }

    return items.filter(
      item => String(item[filter.key]).toLowerCase().includes(filter.value.toLowerCase())
    );;
  }
}