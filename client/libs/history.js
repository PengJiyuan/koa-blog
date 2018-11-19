/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 * history.getPathList() // return pathlist array
 */
import { createBrowserHistory } from 'history';

const getPathList = () => window.location.pathname.split('/').filter(m => !!m);

const HISTORY = createBrowserHistory();

HISTORY.getPathList = getPathList;

export default HISTORY;

