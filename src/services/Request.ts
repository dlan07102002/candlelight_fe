const requestBE = async (path: string) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(
                `Cannot access ${path}: ${response.status} ${response.statusText}`
            );
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
        console.log(path);
        throw error;
    }
};

export default requestBE;
