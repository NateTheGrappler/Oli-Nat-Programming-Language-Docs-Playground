//make a convert to reference the original mts file 
//did this because the typescript checker did not know how to resolve the regular mjs file

export interface OliNatModule {
    //describe the c function that gets wrapped into a runable js funciton, well ts now
    cwrap(
        name: 'runFromSource',
        returnType: 'number',
        argTypes: ['string']
    ):  (source: string) => number;
}

export interface OliNatOptions {
  print?: (line: string) => void;
  printErr?: (line: string) => void;
}

declare function createOliNat(options?: OliNatOptions): Promise<OliNatModule>;
export default createOliNat;