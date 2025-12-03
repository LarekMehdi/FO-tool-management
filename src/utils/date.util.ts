import type { DateValue } from "../interfaces/data.interface";

export abstract class UtilDate {

    /** dd/mm/yyyy **/ 
    static formatFrench(isoDate: string | Date): string {
        const dateValue: DateValue = this.__buildDateValue(isoDate);
        return `${dateValue.day}/${dateValue.month}/${dateValue.year}`;
    }

    /** yyyy-mm-dd **/ 
    static formatEnglish(isoDate: string | Date): string {
        const dateValue: DateValue = this.__buildDateValue(isoDate);
        return `${dateValue.year}-${dateValue.month}-${dateValue.day}`;
    }

    /** PRIVATE **/

    private static __buildDateValue(isoDate: string | Date): DateValue {
        const date: Date = new Date(isoDate);
        const dateValue: DateValue = {
            day: String(date.getDate()).padStart(2, '0'),
            month: String(date.getMonth() + 1).padStart(2, '0'),
            year:  String(date.getFullYear()),
        }
        return dateValue;
    }
}