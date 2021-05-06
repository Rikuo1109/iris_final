import React from 'react';

const ProfileContext = React.createContext({
    name: '',
    isAdmin: false,
    uid: 0,
    reloadUserData: () => { },
});

export default ProfileContext;