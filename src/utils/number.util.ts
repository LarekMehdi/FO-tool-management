export abstract class UtilNumber {


    // 2345 => €2,345
    static toEnglishString(value: number, devise: string = '€'): string {
        return `${devise}${new Intl.NumberFormat('en-US').format(value)}`;
    }

    // 30000 => €30k
    static toShort(value: number, devise: string = '€'): string {
        if (value >= 1_000_000_000) {
            return devise + (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (value >= 1_000_000) {
            return devise + (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (value >= 1_000) {
            return devise + (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return value.toString();
    }
}