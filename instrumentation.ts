export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warmupCatalog } = await import("@/server/preload/catalog");
    void warmupCatalog();
  }
}
