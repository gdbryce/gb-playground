import { useEffect, useState } from "react";

const useAvatar = (userName = "") => {

    /* 
    - ------------------------------------------------------------
    - State for Custom Hook
    - ------------------------------------------------------------
    - avatarID: the value from the useID hook when the avatar is created
    - avatarInitials: The calcualted initials from the input name
    - avatarColor: The random colour generated from the initials
    - expanded: Boolean to determine if the avatar is logo only or scorecard
    - ------------------------------------------------------------
    */
    const [avatarInitials, setAvatarInitials] = useState("");
    const [avatarColor, setAvatarColor] = useState("");

    useEffect(() => {
        calculateInitials();
        calculateColor();
    },[userName]);

    /* 
    - ------------------------------------------------------------
    - Calculate Initials
    - A regexp function on the avatarName to gather the intial from the
    - First name and the Last Name in a space delimited string
    - ------------------------------------------------------------
    */
    const calculateInitials = () => {
        const initials = userName.match(/(\b\S)?/g).join("")
            .match(/(^\S|\S$)?/g)
            .join("").toUpperCase();

        setAvatarInitials(initials);
    }

    /* 
    - ------------------------------------------------------------
    - Calculate Color
    - Using the avatar Name, hash the hue for an HSL color and return in the
    - avatarColor state
    - ------------------------------------------------------------
    */
    const calculateColor = () => {
        let hash = 0;
        for (var i = 0; i < userName.length; i++) {
            hash = userName.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const h = hash % 360;
        const s = 75 + Math.floor((Math.random()-0.5)*10);
        const l = 50 + Math.floor((Math.random()-0.5)*10);

        setAvatarColor(`hsl(${h}, ${s}%, ${l}%)`);
    }

    return [avatarInitials, avatarColor]
};

export default useAvatar;