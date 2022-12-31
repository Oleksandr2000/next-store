const useHandleScroll = (hidden: boolean) => {
    if (hidden) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
};

export default useHandleScroll;
