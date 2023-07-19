const darkReaderOptions = { brightness: 100, contrast: 96, sepia: 0 };

export async function toggleDarkMode() {
   if (typeof window != "undefined") {
      const { isEnabled, enable, disable, setFetchMethod } = await import("darkreader");
      setFetchMethod(window.fetch);
      const isOn = isEnabled();
      isOn ? disable() : enable(darkReaderOptions);
   }
}