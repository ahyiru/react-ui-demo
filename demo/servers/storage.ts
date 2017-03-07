import {$storage} from '../tools/yiru-tools';
import {addClass} from '../tools/dom-tools';

export const isAuthed=()=>{
	return $storage.get('token')?true:false;;
};

export const getToken=()=>{
	return $storage.get('token');
};

export const setToken=(token)=>{
	$storage.set('token',token);
};

export const rmToken=()=>{
	$storage.rm('token');
};

export const getUser=()=>{
	return $storage.get('user');
};

export const setUser=(user)=>{
	$storage.set('user',user);
};

export const rmUser=()=>{
	$storage.rm('user');
};

export const clearAll=()=>{
	$storage.clear();
};

export const getDefault=()=>{
	if(navigator.cookieEnabled){
		let theme=$storage.get('theme')||'';
		addClass(document.body,theme);
		let collapse=$storage.get('collapse')||'';
		addClass(document.body,collapse);
	}else{
		console.log('你处于隐私模式!');
	}
};

