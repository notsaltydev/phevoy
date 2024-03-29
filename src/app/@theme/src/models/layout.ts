export interface Layout {
    header: boolean;
    sidebar: boolean;
    paddings: {
        paddingTop: number;
        paddingTopUnit: string;
        paddingRight: number;
        paddingRightUnit: string;
        paddingBottom: number;
        paddingBottomUnit: string;
        paddingLeft: number;
        paddingLeftUnit: string;
    };
}
