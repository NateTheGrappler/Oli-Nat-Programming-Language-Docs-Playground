//The actual page, so the main div that would hold the markdown with all of the actual documentation
export interface Page {
    slug: string;
    title: string;
    children?: Page[]; //basically if a sidebar nav has extra topics, so stuff like classes or functions arent too dense and can be split by topic
}

//this is the side bar where there would be the different sections, each one being a new page for the person to click into
export interface Section {
    id: string;
    label: string;
    route: string;
    pages: Page[];
    nextRoute: string;
}

//a representation of the documentation layout and different pages as a whole
//pretty much the thing that describes all of the things the docs cover
export const sections: Section[] = [

 //Introduction page that talks about the project as a whole, introduces the language, and gives install instructions
    {
    id: 'introduction',
    label: 'Introduction',
    route: '/docs',
    pages: [
        {slug: 'introduction', title: 'Introduction'}, //maybe eventually make this into like a landing page, maybe
        {slug: 'overview', title: 'Overview'},
        {slug: 'installation', title: 'Installation'},
    ],
    nextRoute: '/docs/guides'
 },


 {
    id: 'contributing',
    label: 'Contributing',
    route: '/docs/contributing',
    pages: [
        { slug: 'getting-started', title: 'Local setup' },
        { slug: 'project-structure', title: 'Project structure' },
        { slug: 'testing', title: 'Running tests' },
        { slug: 'how-to-help', title: 'Ways to contribute' },
    ],
    nextRoute: '/docs',
},

//this is the simple portion of the docs that explain basically how to use the language
 {  
    id: 'guides',
    label: 'Guides',
    route: '/docs/guides',
    pages: [
        {slug: 'syntax', title: 'Syntax'},                      //go over basic syntax like comments, blocks, reserved words, whats a new line, identifiers, operator precendence
        {slug: 'types', title: 'Types'},                        //define the different types like ints, doubles, floats, strings
        {slug: 'variables', title: 'Variables'},                //variable declaration and syntax, the make keywork, needs semicolons, variable assignment and reassignment, all that jazz
        {slug: 'arrays', title: 'Arrays'},                      //go into how to declare an array, different array types, things like indexing and behavior, and how to create and mess with them basically
        {slug: 'controlFlow', title: 'Control Flow'},           //explain more on conditionals and how we handle "truthy", then go into If, for, while, syntax, maybe a bit on operators, iterations and break if I add it
        {slug: 'functions', title: 'Functions'},                //the basic stuff, both function defintions, parameters, syntax, and function calling, no class methods or closures or recursion yet or anything
        {slug: 'errors', title: 'Error Handling'},              //common errors, like syntax errors, possible type errors and what not, the different between type errors, runtime errors, compiler errors, and the different shitty error system i made
        {slug: 'classes', title: 'Classes', children: [
            //basically an overview of how to set up funciton instances
            {slug: 'defintions-methods', title: 'Definitons & Methods'},
            {slug: 'constructors', title: 'Constructors'},
            {slug: 'instances', title: "Class Instances"},
            {slug: 'typing-calling', title: 'Typing & Calling'}, //TODO: this one might be a bit redudant, I'll see when I write the docks
        ]}
    ],
    nextRoute: '/docs/stdlib'
 },

 //cover all of the different functions in the standard library, including also how to import and use them
 {
    id: 'standardlibrary',
    label: 'Standard Library',
    route: '/docs/stdlib',
    pages:
    [
        {slug: 'overview', title: 'Overview'},              //Basically an introduction to how to call in the standard lib, a short overview of all items in stdlib, and a minute note about how stb lib is different in web playground than in real language
        {slug: 'io', title: '#pullf io'},                   //Introduction regular console input/output
        {slug: 'math', title:  '#pullf math'},              //Introduce the syntax and use of all of the different math functions added
        {slug: 'chronos', title: '#pullf chronos'},         //introduct the time functions, and explain them a good bit
        {slug: 'fileIO', title: '#pullf fileIO'},           //introduction how to read and write into files, and datestring/timestirng
        {slug: 'types', title: '#pullf types'},             //the different type converstion functions
        {slug: 'strings', title: '#pullf String'},          //how to mess around with things it's unfortunately not built in
        {slug: 'utils', title: '#pullf utils'},             //the length and assert functions
    ],
    nextRoute: '/docs/advanced-guides'
 },


 //cover the more advanced topics of the language, including things like recursion in functions, closures, inheritance, and all of that real fun stuff
 {
    id: 'advancedGuides',
    label: 'Advanced Guides',
    route: '/docs/advanced-guides',
    pages:
    [
        {slug: 'recursion', title: 'Recursion'},           //honestly the lighter of the topics, handle recursion and it's behavior, maybe a bit about stack size and maximum language depth
        {slug: 'closures', title: 'Closures'},             //Introduct the concept of closures, give some examples and behaviors of closures and capturing upvalues between function calls
        {slug: 'inheritence', title: 'Inheritence', children: 
            [
                //pretty basic stuff in all honesty as a concept, but classes felt a bit too overt in the simple guides, and this is more advanced programming concepts anyways
                {slug: 'inheritenceSyntax', title: 'Syntax'},
                {slug: 'thiskeyword', title: "'this' Keyword"},
                {slug: 'superkeyword', title: "'super' Keyword"}
            ]},
    ],
    nextRoute: '/docs/system-design'
 },

 {
    id: 'architecture',
    label: 'System Architecture & Design Decisions',
    route: '/docs/system-design',
    pages: 
    [
        //this one is probably gonna be the one subject to the most change, and the most technically dense and large of the actual docs website
        //a lot of stuff needs to get covered
        {slug: 'introductionToDesign',      title: 'Introduction to Design'},
        
        {slug: 'chunks-memory',             title: 'Chunks & Memory'},                      //a base overview of the chunk array, dynamic array implementation, and bytecode array introduction
        
        {slug: 'scanner',                   title: 'Scanner'},                              //just go over parsing rules and token creation/pipline
        
        {slug: 'astCompiler',               title: 'AST Compiler'},
        
        {slug: 'typeChecker',               title: 'Type Checker'},
        
        {slug: 'bytecodeCompiler',          title: 'ByteCode Compiler'},
        
        {slug: 'virtualmachine',            title: "Virtual Machine"},
        
        {slug: 'garbage',                  title: "Garbage Collector", children: [
            {slug: 'markSweep',      title: 'Mark-Sweep Implementation'},
            {slug: 'lowlevelmemory', title: 'Low Level Memory Functions'},
        ]},
        
        {slug: 'dataStructures',            title: 'Key Data Structures'},
        {slug: 'functions',                 title: 'Functions & Natives'}

    ],
    nextRoute: '/docs'
 }

]