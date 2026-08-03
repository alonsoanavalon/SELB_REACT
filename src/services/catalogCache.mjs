export async function refreshCatalog({online, load, persist}) {
  if (!online) {
    return false;
  }

  try {
    const value = await load();
    await persist(value);
    return true;
  } catch (_) {
    return false;
  }
}
