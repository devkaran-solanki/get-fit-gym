export const getOptimizedUrl = (url, width) => {
    return url.replace(/w=\d+/, `w=${width}`);
};
