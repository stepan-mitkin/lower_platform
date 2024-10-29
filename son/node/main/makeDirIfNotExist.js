pfun(folder)

try {
    await fs.mkdir(folder, { recursive: true });
} catch (error) {
    // exists
}
