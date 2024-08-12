export interface EchartsLineBarSeriesModel {
    name: string;
    type: string;
    color: string;
    data: number[];
    smooth: boolean;
    label?: any;
}

export interface EchartsLineBarGridModel {
    left: string;
    right: string;
    bottom: string;
    top: string;
    containLabel: true;
}
