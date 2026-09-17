import {useState, useEffect} from 'react';

function useMediaQuery(query: string)
{
    //this runs the media-query engine and returns a MediaQueryList object which is then matched to see if it is true to the query
    const [matches, setMatches] = useState(()=>window.matchMedia(query).matches)

    useEffect(() => {
        //get the MediaQueryList object again because it gets updated by browser
        const mql = window.matchMedia(query);
        
        //function that gets ran whenever the match status changes
        //then basically the event listen is saying call the handler whenever the query answer flips
        //then just clean it up and remove it
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [query]) //so its called whenever query changes

    //return if the query did match the state of the window
    return matches
}

export default useMediaQuery;