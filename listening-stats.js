(function () {
  "use strict";

  const VERSION = 1;
  const MAX_SAMPLE_GAP = 15000;
  const text = {
    title: "My stats", export: "Export listening stats JSON",
    day: "Day", month: "Month", year: "Year", today: "Today",
    period: "Stats period", previous: "Previous period", next: "Next period",
    chooseDate: "Choose a date, month or year",
    listeningTime: "Listening time", listens: "Plays", uniqueTracks: "Tracks", artists: "Artists",
    emptyTitle: "It's quiet here",
    emptyDescription: "Play some music to start collecting stats. Data is only available for periods when the extension was running.",
    hourly: "Activity by hour", daily: "Activity by day", monthly: "Activity by month",
    topTracks: "Top tracks", topArtists: "Top artists", noData: "No data for this period",
    unknownTrack: "Unknown track", unknownArtist: "Unknown artist",
    seconds: "sec", minutes: "min", chartMinutes: "min", hours: "h",
    storageBlocked: "Close other Spotify windows and restart the client.",
    storageRead: "Could not read listening stats",
    storageOpen: "Stats: could not open storage. Please restart Spotify.",
    storageSave: "Stats could not be saved. Export your data and check free disk space.",
  };
  const cardIcons = {
    time: '<path d="M224 1.50046C178.2 7.50046 138.1 23.9005 100.4 52.1005C87.7 61.6005 61.6 87.7005 52.1 100.4C26.3 134.8 10.4 171.5 2.8 213.7C0.8 225 0.5 229.7 0.5 255C0.5 286.2 1.3 293.9 7.1 317.9C23.3 384.6 67.9 443.5 128.5 478.5C159.1 496.2 192.3 507 228.9 511.1C244.4 512.8 282.3 511.8 297.6 509.1C352.2 499.8 398.1 476 437.1 437.1C478.5 395.6 502.8 346.1 510.5 287.7C512.5 272.2 512.5 240.4 510.5 224C500.7 144.4 453.8 74.3005 383 33.1005C355.1 17.0005 321.4 5.80048 287.7 1.50046C273.4 -0.2995 237.8 -0.2995 224 1.50046ZM249.2 82.6005C249.5 111.5 249.6 113.2 251.4 114.6C254 116.5 258.5 116.4 260.4 114.4C261.8 113.1 262 108.8 262 82.4005V52.0005H267.5C281.9 52.0005 309.8 57.8005 326.7 64.3005C338.1 68.7005 352 75.1005 352 75.9005C352 76.3005 349.1 81.6005 345.5 87.8005C338.4 100 337.5 103.9 341.2 106.4C346.6 110.2 349 108.3 357.5 93.2005C360.6 87.6005 363.5 83.0005 363.9 83.0005C365.3 83.0005 379.4 93.2005 387.7 100.2C397.8 108.7 410.1 121.7 417.9 131.8C424.8 141 429.4 147.9 428.9 148.3C428.7 148.5 423.2 151.7 416.7 155.4C404 162.7 402.3 164.9 405.1 169.9C407.7 174.6 411.6 173.9 424 166.6C430.2 163 435.4 160 435.6 160C436.8 160 446.4 181.8 449.9 192.6C455.2 208.9 460 233.9 460 246.2V248.9L429.4 249.2C400.5 249.5 398.8 249.6 397.4 251.4C395.5 254 395.6 258.5 397.6 260.4C398.9 261.8 403.2 262 429.6 262H460V265C460 277.8 455 304.3 449.4 321C446.1 330.8 436.7 352 435.6 352C435.4 352 430.2 349 424 345.4C411.6 338.1 407.7 337.4 405.1 342.1C402.4 346.9 404.1 349 415.7 355.8C421.6 359.2 427.1 362.4 427.9 362.9C430.5 364.6 415.3 384.9 400.1 400.1C384.9 415.3 364.6 430.5 362.9 427.9C362.4 427.1 359.2 421.6 355.8 415.7C349 404.1 346.9 402.4 342.1 405.1C337.4 407.7 338.1 411.6 345.4 424C349 430.2 352 435.4 352 435.6C352 436.7 330.8 446.1 321 449.4C304.3 455 277.8 460 265 460H262V429.6C262 403.2 261.8 398.9 260.4 397.6C258.5 395.6 254 395.5 251.4 397.4C249.6 398.8 249.5 400.5 249.2 429.4L248.9 460H246.2C233.9 460 208.9 455.2 192.6 449.9C181.8 446.4 160 436.8 160 435.6C160 435.4 162.9 430.2 166.5 424.1C170.1 418.1 173 412 173 410.6C173 405.9 168.2 402.8 163.6 404.6C162.7 404.9 159 410.4 155.3 416.8C151.7 423.3 148.5 428.7 148.3 428.9C147.1 430.5 119.9 408.7 109.5 397.9C98.7 386.6 83 366.5 83 364C83 363.6 87.6 360.6 93.3 357.5C108.3 349 110.2 346.6 106.4 341.2C103.9 337.6 99.9 338.4 88.7 344.9C83.1 348.2 77.8 351.2 76.9 351.5C74.1 352.6 62.4 324.3 57.7 305C54.6 292.3 52 275.3 52 267.6V262H82.4C108.8 262 113.1 261.8 114.4 260.4C116.4 258.5 116.5 254 114.6 251.4C113.2 249.6 111.5 249.5 82.6 249.2L52 248.9V244C52 230.1 57.9 201.9 64.3 185.3C70.9 168.3 75.2 159.9 76.9 160.5C77.8 160.8 83.1 163.8 88.8 167.1C100.4 173.9 104.3 174.5 106.9 169.9C109.7 164.9 108 162.8 95.3 155.4C88.8 151.7 83.3 148.5 83.1 148.4C82.4 147.8 89.5 137.5 97.1 128C105.9 117.1 119.2 104 130 95.4005C138.1 89.0005 147.9 82.5005 148.4 83.1005C148.6 83.3005 151.6 88.4005 155 94.5005C158.5 100.5 162 106 162.9 106.7C166.8 109.7 173 106.5 173 101.5C173 100.1 170 93.7005 166.4 87.4005C162.7 81.1005 159.9 75.8005 160.2 75.5005C161.2 74.5005 178.2 67.0005 187 63.7005C203.7 57.5005 228.6 52.3005 242.7 52.1005L248.9 52.0005L249.2 82.6005Z"/><path d="M251.4 138.4C249.6 139.8 249.5 141.6 249.2 183.7L248.9 227.5L244.4 229.4C239.8 231.3 233.2 236.8 231.3 240.3C230.4 242 226.5 241.1 171.8 226.6C110.8 210.3 109.4 210 107.6 214.5C106.5 217.5 107 220.7 108.8 222.2C109.7 223 135 230.3 165 238.4C195 246.4 221.1 253.5 223.1 254C226.5 255 226.8 255.3 227.3 259.9C228.4 269.2 233.7 276.9 242.2 281.5C246.9 284.2 248.4 284.5 256 284.5C262.1 284.5 265.4 284 267.6 282.8L270.8 281.1L299 310.6C315.6 327.8 328.3 340.3 329.7 340.6C333.3 341.6 336.7 339.6 337.5 336.1C337.8 334.4 337.8 332.4 337.3 331.6C336.9 330.9 324.1 317.3 309 301.5C293.5 285.3 281.6 272.1 281.7 271.1C281.8 270.2 282.5 267.7 283.4 265.5C285.1 260.9 285.4 253.1 284 248C281.6 239.2 272.4 229.9 264.8 228.3L262 227.7V184C262 142.9 261.9 140.2 260.2 138.7C257.9 136.6 254 136.5 251.4 138.4Z"/>',
    plays: '<path d="M224 1.4996C185.1 6.29959 147.4 20.2996 114.9 41.8996C64.4999 75.3996 27.7999 124.4 10.5999 181.4C6.4999 194.6 2.4999 214.7 0.999902 228.2C-0.300098 240.7 -0.300098 271.3 0.999902 283.8C11.7999 385.2 83.4999 471.8 181.4 501.4C194.6 505.5 214.7 509.5 228.2 511C240.7 512.3 271.3 512.3 283.8 511C343 504.7 397.9 477.8 440.1 434.4C469 404.5 489.5 369.9 501.4 330.6C508.8 306.3 512 283.8 512 256C512 235.1 511 223.6 507.4 205.5C489.3 113.5 420.7 37.8996 330.6 10.5996C317.4 6.4996 297.3 2.4996 283.8 0.999603C270.7 -0.400391 236.9 -0.100403 224 1.4996ZM278.5 52.9996C348.8 61.0996 410.1 105.3 441 170.2C462.9 216.3 466.1 270.6 449.9 319.4C424.7 395.1 357.3 450 278.5 459C267 460.3 245 460.3 233.5 459C154.7 450 87.2999 395.1 62.0999 319.4C45.8999 270.6 49.0999 216.3 70.9999 170.2C101.6 105.8 163.2 61.1996 232.3 53.0996C242.7 51.8996 268.1 51.8996 278.5 52.9996Z"/><path d="M204.4 163C201 164.3 196.5 169.5 195 173.6C193.8 176.8 193.5 190.8 193.2 251.5C192.9 325.8 193.2 334.5 196.5 341.3C200.6 350 211.2 352.4 222.2 347.3C230.8 343.2 349.7 274.5 354 271.1C364.5 262.7 364.5 249.3 354 240.9C349.8 237.6 231.1 168.9 222.5 164.8C216.4 161.9 208.9 161.2 204.4 163Z"/>',
    tracks: '<path d="M223.5 1.49979C177.3 7.49979 135 25.1998 98.0002 53.7998C86.3002 62.8998 66.4002 82.4998 56.7002 94.4998C29.1002 128.7 10.8002 169.1 3.00024 213.1C0.200239 228.7 -0.899761 266.2 0.900239 283.3C5.20024 323.2 19.1002 362.3 40.7002 395.5C50.5002 410.5 59.1002 421.2 72.5002 434.9C114.4 477.9 167.3 503.9 227.5 510.9C240.9 512.5 273.5 512.2 288 510.5C362.8 501.2 429.6 459.3 471.3 395.5C492.3 363.4 505.7 326.5 510.5 288C512.5 271.8 512.5 240.3 510.5 224C501.3 149.8 459.5 82.7998 396.5 41.3998C363.6 19.7998 327 6.39981 288 1.49979C272.8 -0.300232 237.9 -0.300232 223.5 1.49979ZM263.8 42.1998C266.8 45.8998 267.2 52.2998 266.1 76.9998C264.6 109.2 263.4 122.1 261.6 126.4L260.1 130H251.2C236.5 130 225.5 132.4 203.1 140.5C196.5 142.9 195.3 143 191 142C188.4 141.4 184.9 139.7 183.1 138.2C181.4 136.7 173.3 124 165 110C151.3 86.6998 150 84.0998 150 79.6998C150 72.9998 153 67.6998 158.5 64.3998C165.4 60.3998 186.1 52.1998 197.7 48.9998C207.2 46.2998 227.4 42.4998 236.5 41.6998C247.1 40.6998 262.8 40.9998 263.8 42.1998ZM127.5 97.8998C131.4 100.1 166.3 145 169 151.1C171.5 157.1 171.5 160.1 168.9 163.4C166.4 166.6 161.5 166.9 155.5 164.1C150.1 161.6 108.1 124.9 105.3 120.3C101.2 113.5 102.5 105.5 108.7 99.8998C114.1 94.7998 121 94.0998 127.5 97.8998ZM280.3 169.4C311.4 178.6 334.6 202.2 343.2 233.5C346.3 245 346.3 267 343.2 278.5C334.7 309.6 311.6 333.1 280.3 342.7C272.4 345.1 270 345.4 256 345.4C242 345.4 239.6 345.1 231.7 342.7C200.3 333.1 177.4 309.8 168.8 278.5C167 271.9 166.6 267.9 166.6 255.5C166.7 242.1 167 239.5 169.3 231.7C179.8 197.5 206.7 173.3 241.7 167C244.3 166.5 252.1 166.3 259 166.5C268.7 166.7 273.4 167.4 280.3 169.4ZM355.7 350.3C358.1 351.5 370.1 361.4 382.4 372.2C401.6 389 405 392.5 406.5 396.4C408.7 402.2 407.9 406.9 403.9 411.5C397.5 418.8 387.7 418.4 380.2 410.7C372.6 402.8 343.7 366.5 341.9 362.5C339.5 357.3 339.5 351.8 341.8 349.8C345.4 346.6 348.6 346.7 355.7 350.3ZM323.5 374.4C326.8 376.2 330.1 380.5 343.7 401.3C352.6 415 360.4 427.9 361 430.1C363.6 439.8 358.3 446.2 341.4 453.3C313.8 464.9 285.2 471 258.1 471C248.4 471 248 470.9 246.4 468.4C245.3 466.8 244.5 463.1 244.2 458.2C243.7 448.6 246.7 396.5 248.1 390.2C249.7 383 250.7 382.4 261.1 382.1C273.1 381.9 285.3 379.7 297.5 375.5C303 373.7 308.4 372 309.5 371.7C312.9 370.9 319.3 372.1 323.5 374.4Z"/><path d="M245.9 223.5C216.5 232.9 213.9 273.7 241.9 286.9C246.6 289.1 248.9 289.5 256 289.5C263.1 289.5 265.4 289.1 270.1 286.9C277.3 283.5 283.5 277.3 286.9 270.1C290.5 262.5 290.6 250 287.2 242.6C281.5 230.2 271.1 223 257.7 222.4C253.2 222.1 248.8 222.6 245.9 223.5Z"/>',
    artists: '<path d="M187.5 43.1C128.4 51.2 84.9999 100.7 84.9999 160C84.9999 200.9 105.9 238.8 140.4 260.1C146.8 264 147.9 265.1 146.4 265.6C109.4 278.6 75.7999 309.3 57.9999 346.5C46.0999 371.4 41.4999 395.4 42.0999 428.6C42.4999 444.7 42.5999 445.8 45.2999 451.1C48.4999 457.7 55.1999 464.3 61.7999 467.3L66.4999 469.5H202.5H338.5L344.1 466.9C355.5 461.5 362 451.7 362.8 438.6L363.3 430.7L360.9 431.4C342.8 436.6 333.2 437.7 320.8 436.1C276.4 430.2 243.9 391.7 246.3 348C247.2 332.4 252.2 316.9 260.1 305.3C264.4 299 275.2 287.7 281.3 283.3C283.9 281.4 286 279.5 286 279.1C286 278.1 270.3 270 262.7 267L257 264.8L263.6 260.9C291.7 244.5 312.8 213.8 318.5 181.2C320.4 170.4 320.4 149.7 318.5 138.9C310.3 91.9 273.6 54.4 226 44.5C216.7 42.5 196.7 41.8 187.5 43.1Z"/><path d="M447.5 163.2C437 167.8 423.1 170.9 409 171.9C399.2 172.6 395.2 173.3 391.4 175.1C385.2 178.1 379.1 184.1 375.9 190.5L373.5 195.5L373.2 249.2L372.9 302.9L368.1 299.5C357.2 291.7 345.3 288 330.7 288C312 288 298.4 293.6 285.4 306.5C278.9 313 276.4 316.3 273.2 323.1C263.8 342.5 263.8 361.2 273.2 380.9C280.9 397 296.9 409.9 315 414.5C324.7 417 343.2 416.2 352.2 412.8C361.8 409.2 369.3 404.4 376.4 397.4C383.6 390.1 388.1 382.9 391.8 372.8L394.5 365.5L395 283.5C395.5 207.7 395.6 201.2 397.2 198.8C399.3 195.5 404.3 194 412.6 194C425.4 194 445.2 189.2 459.8 182.4C466 179.6 467.3 178.5 468.6 175.4C470.7 170.4 469.7 165.8 465.9 162.6C461.8 159.1 456.5 159.3 447.5 163.2Z"/>',
  };
  const number = new Intl.NumberFormat("en-US");
  const ui = {
    locale: "en-US",
    number: (value) => number.format(value),
    date: (date, options) => date.toLocaleDateString("en-US", options),
    plays: (value) => `${number.format(value)} ${value === 1 ? "play" : "plays"}`,
    minutes: (ms) => `${number.format(Math.floor(ms / 60000))} min`,
    chartMinutes: (ms) => `${ms < 60000 ? "<1" : number.format(Math.floor(ms / 60000))} min`,
    name: (entry, isTrack) => entry.name || (isTrack ? text.unknownTrack : text.unknownArtist),
  };
  const pad = (value) => String(value).padStart(2, "0");
  const dateKey = (value) => {
    const date = new Date(value);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };
  const emptyDatabase = () => ({ version: VERSION, createdAt: Date.now(), days: {}, tracks: {}, artwork: {} });
  const emptyDay = (date) => ({ date, hours: Array(24).fill(0), tracks: {} });

  function imageUrl(value) {
    if (typeof value !== "string") return "";
    if (/^spotify:image:[a-f0-9]+$/i.test(value)) return `https://i.scdn.co/image/${value.slice(14)}`;
    return /^https:\/\//i.test(value) ? value : "";
  }

  function pickImage(sources) {
    const list = Array.isArray(sources) ? sources : sources?.sources || sources?.items || [];
    const images = list.map((source) => typeof source === "string" ? { url: source } : source)
      .filter((source) => imageUrl(source?.url));
    images.sort((a, b) => Math.abs((a.width || 300) - 160) - Math.abs((b.width || 300) - 160));
    return imageUrl(images[0]?.url);
  }

  function trackFromItem(item) {
    if (!item || !/^spotify:(track|local):/.test(item.uri || "")) return null;
    const metadata = item.metadata || {};
    let artists = (item.artists || []).map((artist) => ({
      name: artist.name || "",
      uri: artist.uri || "",
      image: pickImage(artist.images) || pickImage(artist.visuals?.avatarImage?.sources),
    }));
    if (!artists.length) {
      artists = Object.keys(metadata)
        .filter((key) => /^artist_name(?::\d+)?$/.test(key))
        .sort((a, b) => (a === "artist_name" ? -1 : b === "artist_name" ? 1 : a.localeCompare(b)))
        .map((key) => ({ name: metadata[key], uri: metadata[key.replace("name", "uri")] || "" }));
    }
    if (!artists.length) artists = [{ name: "", uri: "" }];
    return {
      uri: item.uri,
      name: item.name || metadata.title || "",
      artists,
      album: item.album?.name || metadata.album_title || "",
      image: pickImage(item.album?.images) || pickImage(item.images) ||
        pickImage(item.album?.coverArt) || imageUrl(metadata.image_url) || imageUrl(metadata.image_small_url) ||
        imageUrl(metadata.image_large_url) || imageUrl(metadata.image_xlarge_url),
    };
  }

  class Tracker {
    constructor(database, changed = () => {}) {
      this.database = database;
      this.changed = changed;
      this.previous = null;
      this.session = null;
    }

    addTime(track, start, end) {
      if (end <= start) return;
      const db = this.database;
      db.tracks[track.uri] = track;
      this.changed("tracks", track.uri);
      while (start < end) {
        const date = dateKey(start);
        const point = new Date(start);
        const boundary = new Date(start);
        boundary.setMinutes(0, 0, 0);
        const next = Math.min(end, boundary.getTime() + 3600000);
        const day = db.days[date] || (db.days[date] = emptyDay(date));
        const row = day.tracks[track.uri] || (day.tracks[track.uri] = { ms: 0, plays: 0 });
        row.ms += next - start;
        day.hours[point.getHours()] += next - start;
        this.changed("days", date);
        start = next;
      }
    }

    addPlay(track, at) {
      const date = dateKey(at);
      const day = this.database.days[date] || (this.database.days[date] = emptyDay(date));
      const row = day.tracks[track.uri] || (day.tracks[track.uri] = { ms: 0, plays: 0 });
      row.plays += 1;
      this.changed("days", date);
    }

    ingest(current) {
      const previous = this.previous;
      this.previous = current;
      if (!current?.track) {
        this.session = null;
        return;
      }
      const same = previous?.track && previous.key === current.key;
      const elapsed = previous ? current.clock - previous.clock : 0;
      const wallElapsed = previous ? current.at - previous.at : 0;
      const continuous = elapsed > 0 && elapsed <= MAX_SAMPLE_GAP && Math.abs(elapsed - wallElapsed) < 1500;
      const speed = previous?.speed || 1;
      const delta = same ? current.progress - previous.progress : 0;
      const wrapped = same && continuous && previous.playing && current.playing &&
        previous.duration > 0 && previous.progress >= previous.duration - 1500 &&
        current.progress < 1500 && delta < 0 &&
        Math.abs(previous.duration - previous.progress + current.progress - elapsed * speed) < 1500;

      if (!same || wrapped || !this.session) this.session = { ms: 0, counted: false };
      if (!same || !continuous || !previous.playing || previous.buffering || current.buffering) return;

      let played = delta;
      if (wrapped) played = previous.duration - previous.progress + current.progress;
      if (played <= 0 || Math.abs(played - elapsed * speed) > Math.max(1500, elapsed * speed * 0.3)) return;
      const ms = Math.min(elapsed, played / speed);
      if (!(ms > 0)) return;
      this.addTime(current.track, current.at - ms, current.at);
      this.session.ms += wrapped ? Math.min(ms, current.progress / speed) : ms;
      const threshold = Math.min(30000, current.duration > 0 ? current.duration / 2 : 30000);
      if (!this.session.counted && this.session.ms >= threshold) {
        this.addPlay(current.track, current.at);
        this.session.counted = true;
      }
    }
  }

  function aggregate(database, period, anchor) {
    const prefix = dateKey(anchor).slice(0, period === "day" ? 10 : period === "month" ? 7 : 4);
    const tracks = new Map();
    const artists = new Map();
    const bins = Array(period === "day" ? 24 : period === "month"
      ? new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate() : 12).fill(0);
    let ms = 0;
    let plays = 0;
    let activeDays = 0;
    for (const [date, day] of Object.entries(database.days)) {
      if (!date.startsWith(prefix)) continue;
      let dailyMs = 0;
      for (const [uri, row] of Object.entries(day.tracks)) {
        if (row.ms <= 0 && row.plays <= 0) continue;
        const metadata = database.tracks[uri] || { uri, name: uri, artists: [], album: "" };
        const track = tracks.get(uri) || { ...metadata, ms: 0, plays: 0 };
        track.ms += row.ms;
        track.plays += row.plays;
        tracks.set(uri, track);
        const seen = new Set();
        for (const artist of metadata.artists) {
          const key = artist.uri || artist.name;
          if (seen.has(key)) continue;
          seen.add(key);
          const entry = artists.get(key) || { ...artist, ms: 0, plays: 0 };
          entry.ms += row.ms;
          entry.plays += row.plays;
          artists.set(key, entry);
        }
        dailyMs += row.ms;
        plays += row.plays;
      }
      ms += dailyMs;
      if (dailyMs > 0) activeDays += 1;
      if (period === "day") day.hours.forEach((value, hour) => { bins[hour] += value; });
      else bins[Number(date.slice(period === "month" ? 8 : 5, period === "month" ? 10 : 7)) - 1] += dailyMs;
    }
    const sortedTracks = [...tracks.values()].sort((a, b) =>
      b.plays - a.plays || b.ms - a.ms || a.name.localeCompare(b.name));
    const sortedArtists = [...artists.values()].sort((a, b) =>
      b.ms - a.ms || b.plays - a.plays || a.name.localeCompare(b.name));
    return { ms, plays, activeDays, tracks: sortedTracks, artists: sortedArtists, bins };
  }

  function duration(ms) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${ui.number(seconds)} sec`;
    const minutes = Math.floor(seconds / 60);
    return minutes < 60 ? `${ui.number(minutes)} min`
      : `${ui.number(Math.floor(minutes / 60))} h ${ui.number(minutes % 60)} min`;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { Tracker, aggregate, dateKey, duration, emptyDatabase, trackFromItem, imageUrl, pickImage, ui };
    return;
  }

  async function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("spicetify-listening-stats", VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore("days", { keyPath: "date" });
        db.createObjectStore("tracks", { keyPath: "uri" });
        db.createObjectStore("settings", { keyPath: "key" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error(text.storageBlocked));
    });
  }

  async function readDatabase(connection) {
    return new Promise((resolve, reject) => {
      const data = emptyDatabase();
      const transaction = connection.transaction(["days", "tracks", "settings"], "readonly");
      for (const name of ["days", "tracks"]) {
        const request = transaction.objectStore(name).getAll();
        request.onsuccess = () => {
          for (const row of request.result) data[name][row[name === "days" ? "date" : "uri"]] = row;
        };
      }
      const setting = transaction.objectStore("settings").get("createdAt");
      setting.onsuccess = () => { if (setting.result) data.createdAt = setting.result.value; };
      const artwork = transaction.objectStore("settings").get("artwork");
      artwork.onsuccess = () => { if (artwork.result) data.artwork = artwork.result.value || {}; };
      transaction.oncomplete = () => resolve(data);
      transaction.onabort = () => reject(transaction.error || new Error(text.storageRead));
    });
  }

  const CSS = `
    button[data-listening-stats] svg { width: 24px; height: 24px; flex-shrink: 0; }
    generic-modal .GenericModal:has(.lst-root) { width: min(960px, calc(100vw - 32px)); max-width: calc(100vw - 32px);
      max-height: calc(100vh - 32px); min-width: 0; box-sizing: border-box; }
    generic-modal .GenericModal:has(.lst-root) > .spicetify-popup-container {
      width: 100%; max-width: 100%; min-width: 0; min-height: 0; max-height: inherit; flex: 1 1 auto; box-sizing: border-box; }
    generic-modal .GenericModal:has(.lst-root) .spicetify-popup-header { width: 100%; box-sizing: border-box; }
    .GenericModal:has(.lst-root) main { width: 100%; min-width: 0; min-height: 0; box-sizing: border-box;
      max-height: 78vh; overflow-y: auto; overflow-x: hidden; }
    .GenericModal:has(.lst-root), .GenericModal:has(.lst-root) main { scrollbar-width: none; -ms-overflow-style: none; }
    .GenericModal:has(.lst-root)::-webkit-scrollbar,
    .GenericModal:has(.lst-root) main::-webkit-scrollbar { display: none; width: 0; height: 0; }
    .lst-root { width: 100%; min-width: 0; color: var(--spice-text, #fff); font-size: 14px; line-height: 1.5; }
    .lst-root * { box-sizing: border-box; }
    .lst-root button, .lst-root input { font: inherit; }
    .lst-root button { cursor: pointer; color: inherit; border: 1px solid #ffffff26;
      background: #ffffff09; border-radius: 24px; padding: 8px 16px; }
    .lst-root button:not(.lst-selected):hover { background: #ffffff1a; }
    .lst-root button:focus-visible, .lst-root input:focus-visible { outline: 2px solid var(--spice-button, #1db954); outline-offset: 3px; }
    .lst-root button:disabled { opacity: .35; cursor: default; }
    .lst-toolbar, .lst-periods, .lst-navigation { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .lst-toolbar { justify-content: space-between; margin-bottom: 18px; }
    .lst-date-picker { position: relative; }
    .lst-root .lst-date-trigger { display: flex; align-items: center; gap: 8px; border-radius: 8px; }
    .lst-date-trigger svg { width: 16px; height: 16px; flex-shrink: 0; }
    .lst-date-panel { position: absolute; top: calc(100% + 8px); right: 0; z-index: 20; width: 272px;
      max-width: calc(100vw - 64px); padding: 12px; border-radius: 12px; background: #202020; color: #fff;
      box-shadow: 0 8px 28px #0009; max-height: 55vh; overflow-y: auto; scrollbar-width: none; }
    .lst-date-panel[hidden] { display: none; }
    .lst-date-header { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 10px; }
    .lst-root .lst-date-header button { padding: 6px 10px; border: 0; }
    .lst-root .lst-date-heading { flex: 1; font-weight: 700; }
    .lst-date-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; }
    .lst-date-days { grid-template-columns: repeat(7, minmax(0, 1fr)); }
    .lst-root .lst-date-cell { border: 0; border-radius: 6px; padding: 9px 2px; font-size: 12px; }
    .lst-date-weekday { text-align: center; color: #aaa; font-size: 11px; padding: 4px 0; }
    .lst-root .lst-date-today { box-shadow: inset 0 0 0 1px #ffffff70; }
    .lst-root .lst-date-current { width: 100%; border: 0; margin-top: 10px; border-radius: 6px; font-size: 12px; }
    .lst-root .lst-selected { background: var(--spice-button, #1db954); color: var(--spice-main, #121212); border-color: transparent; font-weight: 700; }
    .lst-root button.lst-selected:hover { background: var(--spice-button, #1db954); color: var(--spice-main, #121212); filter: brightness(1.08); }
    .lst-root input { color-scheme: dark; background: #ffffff0d; color: inherit; border: 1px solid #ffffff26; border-radius: 8px; padding: 7px; max-width: 155px; }
    .lst-title { font-size: 25px; font-weight: 800; margin: 0 0 16px; text-transform: capitalize; }
    .lst-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 22px; }
    .lst-card { position: relative; isolation: isolate; overflow: hidden; background: #ffffff09;
      border: 1px solid #ffffff0d; border-radius: 12px; padding: 16px; }
    .lst-card-icon { position: absolute; right: -16px; bottom: -16px; width: 72px; height: 72px;
      transform: rotate(-25deg); transform-origin: center; opacity: .12; color: var(--spice-text, #fff);
      pointer-events: none; z-index: -1; }
    .lst-card-icon svg { display: block; width: 100%; height: 100%; }
    .lst-value { display: block; font-size: 24px; font-weight: 800; letter-spacing: -.5px; }
    .lst-muted { color: var(--spice-subtext, #b3b3b3); font-size: 12px; }
    .lst-root h3 { font-size: 17px; font-weight: 700; margin: 0 0 12px; }
    .lst-chart { display: flex; align-items: stretch; gap: 4px; height: 150px; margin-bottom: 24px; }
    .lst-column { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; }
    .lst-bar-space { height: 122px; width: 100%; display: flex; align-items: flex-end; }
    .lst-bar { position: relative; width: 100%; min-height: 2px; border-radius: 4px 4px 0 0; background: var(--spice-button, #1db954); }
    .lst-bar:has(.lst-bar-label) { min-height: 50px; }
    .lst-bar-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(180deg);
      writing-mode: vertical-rl; text-orientation: mixed; background: none; color: #000;
      font-size: 12px; font-weight: 700; line-height: 1.1; white-space: nowrap;
      pointer-events: none; font-variant-numeric: tabular-nums; }
    .lst-column:hover .lst-bar { filter: brightness(1.2); }
    .lst-axis { font-size: 10px; color: var(--spice-subtext, #b3b3b3); height: 16px; }
    .lst-lists { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; }
    .lst-lists section { min-width: 0; }
    .lst-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #ffffff0c; }
    .lst-rank { color: var(--spice-subtext, #b3b3b3); width: 20px; flex-shrink: 0; font-variant-numeric: tabular-nums; }
    .lst-artwork { width: 44px; height: 44px; flex: 0 0 44px; border-radius: 7px; overflow: hidden;
      display: grid; place-items: center; background: #ffffff10; color: var(--spice-subtext, #b3b3b3); }
    .lst-artwork-artist { border-radius: 50%; }
    .lst-artwork img { width: 100%; height: 100%; display: block; object-fit: cover; }
    .lst-artwork svg { width: 22px; height: 22px; fill: currentColor; }
    .lst-info { flex: 1; min-width: 0; }
    .lst-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
    .lst-subtitle { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lst-metric { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
    .lst-empty { text-align: center; padding: 32px 16px; background: #ffffff06; border-radius: 12px; margin-bottom: 20px; }
    .lst-empty strong { display: block; font-size: 20px; margin-bottom: 8px; }
    @media (max-width: 650px) { .lst-cards { grid-template-columns: 1fr 1fr; } .lst-lists { grid-template-columns: 1fr; } .lst-value { font-size: 21px; } }
  `;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(text, action, label) {
    const node = element("button", "", text);
    node.type = "button";
    node.onclick = action;
    if (label) node.setAttribute("aria-label", label);
    return node;
  }

  async function start() {
    const api = window.Spicetify;
    if (!api?.Player?.addEventListener || !api?.PopupModal || !api?.Menu?.Item || !api?.Topbar?.Button) {
      setTimeout(start, 300);
      return;
    }
    if (window.__listeningStatsStarted) return;
    window.__listeningStatsStarted = true;

    let connection;
    let data;
    try {
      connection = await openDatabase();
      data = await readDatabase(connection);
    } catch (error) {
      console.error("[Listening Stats] Storage unavailable", error);
      api.showNotification(text.storageOpen, true);
      window.__listeningStatsStarted = false;
      return;
    }

    let dirty = { days: new Set(), tracks: new Set() };
    let artworkDirty = false;
    let saving = false;
    let lastWarning = 0;
    const tracker = new Tracker(data, (store, key) => dirty[store].add(key));
    const reportStorageError = (error) => {
      console.error("[Listening Stats] Save failed", error);
      if (Date.now() - lastWarning > 60000) {
        lastWarning = Date.now();
        api.showNotification(text.storageSave, true);
      }
    };
    const flush = () => {
      if (saving || (!dirty.days.size && !dirty.tracks.size && !artworkDirty)) return;
      const pending = dirty;
      const pendingArtwork = artworkDirty;
      artworkDirty = false;
      dirty = { days: new Set(), tracks: new Set() };
      saving = true;
      const failed = (error) => {
        for (const name of ["days", "tracks"]) for (const key of pending[name]) dirty[name].add(key);
        artworkDirty = artworkDirty || pendingArtwork;
        saving = false;
        reportStorageError(error);
      };
      try {
        const transaction = connection.transaction(["days", "tracks", "settings"], "readwrite");
        for (const name of ["days", "tracks"]) {
          for (const key of pending[name]) transaction.objectStore(name).put(data[name][key]);
        }
        transaction.objectStore("settings").put({ key: "createdAt", value: data.createdAt });
        if (pendingArtwork) transaction.objectStore("settings").put({ key: "artwork", value: data.artwork });
        transaction.oncomplete = () => { saving = false; };
        transaction.onabort = () => failed(transaction.error);
      } catch (error) { failed(error); }
    };

    const sample = () => {
      try {
        const state = api.Player.data;
        const track = trackFromItem(state?.item);
        const progress = Number(api.Player.getProgress());
        tracker.ingest({
          at: Date.now(), clock: performance.now(), track,
          key: track ? `${track.uri}|${state.playbackId || state.item.uid || ""}` : "",
          progress: Number.isFinite(progress) ? progress : 0,
          duration: Number(state?.duration || state?.item?.duration?.milliseconds || api.Player.getDuration()) || 0,
          playing: Boolean(track && api.Player.isPlaying()),
          buffering: Boolean(state?.isBuffering),
          speed: Number(state?.speed) > 0 ? Number(state.speed) : 1,
        });
      } catch (error) {
        tracker.previous = null;
        console.debug("[Listening Stats] Player not ready", error);
      }
    };

    let period = "day";
    let anchor = new Date();
    let view = null;
    let refreshView = () => {};
    let closeDatePicker = () => {};
    let datePickerHost = null;
    document.addEventListener("pointerdown", (event) => {
      if (datePickerHost && !datePickerHost.contains(event.target)) closeDatePicker();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && datePickerHost) {
        event.preventDefault();
        event.stopPropagation();
        closeDatePicker(true);
      }
    }, true);

    const imageRequests = new Map();
    const imageFailures = new Map();
    const brokenImages = new Set();
    const usableImage = (url) => brokenImages.has(imageUrl(url)) ? "" : imageUrl(url);
    const imageQueue = [];
    let activeRequests = 0;
    const pumpImages = () => {
      while (activeRequests < 3 && imageQueue.length) {
        activeRequests += 1;
        const task = imageQueue.shift();
        task().finally(() => { activeRequests -= 1; pumpImages(); });
      }
    };
    const fetchArtwork = (entry, isTrack) => {
      const cached = usableImage(data.artwork[entry.uri]);
      const embedded = usableImage(entry.image);
      if (cached || embedded) return Promise.resolve(cached || embedded);
      const uri = entry.uri || "";
      if (!/^spotify:(track|artist):[a-z0-9]+$/i.test(uri)) return Promise.resolve("");
      if ((imageFailures.get(uri) || 0) > Date.now()) return Promise.resolve("");
      if (imageRequests.has(uri)) return imageRequests.get(uri);
      const request = new Promise((resolve) => {
        imageQueue.push(async () => {
          let url = "";
          if (isTrack && api.GraphQL?.Definitions?.getTrack && api.GraphQL?.Request) {
            try {
              const result = await api.GraphQL.Request(api.GraphQL.Definitions.getTrack, { uri });
              url = usableImage(pickImage(result?.data?.trackUnion?.albumOfTrack?.coverArt));
            } catch (error) { console.debug("[Listening Stats] Track artwork unavailable", uri, error); }
          }
          if (isTrack && !url && api.CosmosAsync?.get && api.URI?.idToHex) {
            try {
              const id = api.URI.idToHex(uri.split(":")[2]);
              const result = await api.CosmosAsync.get(`https://spclient.wg.spotify.com/metadata/4/track/${id}`);
              const album = result?.album;
              const covers = album?.cover_group?.image || album?.coverGroup?.image || album?.cover || [];
              url = usableImage(pickImage(covers.map((cover) => ({
                width: cover.width,
                url: cover.url || (/^[a-f0-9]+$/i.test(cover.file_id || cover.fileId || "")
                  ? `spotify:image:${cover.file_id || cover.fileId}` : ""),
              }))));
            } catch (error) { console.debug("[Listening Stats] Track metadata unavailable", uri, error); }
          }
          if (!isTrack && api.GraphQL?.Definitions?.queryArtistOverview && api.GraphQL?.Request) {
            try {
              const result = await api.GraphQL.Request(api.GraphQL.Definitions.queryArtistOverview, {
                uri, locale: "en", includePrerelease: false,
              });
              const visuals = result?.data?.artistUnion?.visuals;
              url = usableImage(pickImage(visuals?.avatarImage?.sources) || pickImage(visuals?.headerImage?.sources));
            } catch (error) { console.debug("[Listening Stats] Artist artwork unavailable", uri, error); }
          }
          if (!url && api.CosmosAsync?.get) {
            try {
              const result = await api.CosmosAsync.get(`https://api.spotify.com/v1/${isTrack ? "tracks" : "artists"}/${uri.split(":")[2]}`);
              url = usableImage(pickImage(isTrack ? result?.album?.images : result?.images));
            } catch (error) { console.debug("[Listening Stats] Artwork unavailable", uri, error); }
          }
          if (url) { data.artwork[uri] = url; artworkDirty = true; }
          else imageFailures.set(uri, Date.now() + 300000);
          imageRequests.delete(uri);
          resolve(url);
        });
      });
      imageRequests.set(uri, request);
      pumpImages();
      return request;
    };
    const artworkNode = (entry, isTrack) => {
      const box = element("div", `lst-artwork${isTrack ? "" : " lst-artwork-artist"}`);
      box.setAttribute("aria-hidden", "true");
      const fallback = () => {
        box.innerHTML = isTrack
          ? '<svg viewBox="0 0 24 24"><path d="M9 3v12.2A4 4 0 1 0 11 19V7h7V3z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 3-9 7v1h18v-1c0-4-4-7-9-7z"/></svg>';
      };
      fallback();
      const display = (url) => {
        if (!url) return;
        const image = element("img");
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        image.onerror = () => {
          fallback();
          brokenImages.add(url);
          if (data.artwork[entry.uri] === url) { delete data.artwork[entry.uri]; artworkDirty = true; }
          imageFailures.delete(entry.uri);
          fetchArtwork(entry, isTrack).then(display);
        };
        image.src = url;
        box.replaceChildren(image);
      };
      const cached = usableImage(data.artwork[entry.uri]) || usableImage(entry.image);
      if (cached) display(cached);
      else fetchArtwork(entry, isTrack).then(display);
      return box;
    };

    const exportData = () => {
      sample();
      flush();
      const payload = { ...data, exportedAt: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = element("a");
      link.href = url;
      link.download = `listening-stats-${dateKey(Date.now())}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };

    const show = () => {
      closeDatePicker();
      sample();
      flush();
      view = element("div", "lst-root");
      view.setAttribute("lang", "en");
      const toolbar = element("div", "lst-toolbar");
      const tabs = element("div", "lst-periods");
      tabs.setAttribute("aria-label", text.period);
      const tabButtons = new Map();
      for (const key of ["day", "month", "year"]) {
        const tab = button(text[key], () => { closeDatePicker(); period = key; render(); });
        tabButtons.set(key, tab);
        tabs.append(tab);
      }
      const navigation = element("div", "lst-navigation");
      const move = (offset) => {
        closeDatePicker();
        if (period === "day") anchor.setDate(anchor.getDate() + offset);
        else if (period === "month") { anchor.setDate(1); anchor.setMonth(anchor.getMonth() + offset); }
        else { anchor.setDate(1); anchor.setFullYear(anchor.getFullYear() + offset); }
        render();
      };
      const prev = button("‹", () => move(-1), text.previous);
      const pickerHost = element("div", "lst-date-picker");
      const picker = button("", () => {
        if (!panel.hidden) { closeDatePicker(); return; }
        cursor = new Date(anchor);
        pickerMode = period;
        panel.hidden = false;
        datePickerHost = pickerHost;
        picker.setAttribute("aria-expanded", "true");
        renderPicker();
        panel.querySelector(".lst-selected, .lst-date-cell")?.focus();
      });
      picker.className = "lst-date-trigger";
      picker.setAttribute("aria-label", text.chooseDate);
      picker.setAttribute("aria-haspopup", "dialog");
      picker.setAttribute("aria-expanded", "false");
      const pickerLabel = element("span");
      const calendarIcon = element("span");
      calendarIcon.setAttribute("aria-hidden", "true");
      calendarIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18"/></svg>';
      picker.append(pickerLabel, calendarIcon);
      const panel = element("div", "lst-date-panel");
      panel.hidden = true;
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-label", text.chooseDate);
      pickerHost.append(picker, panel);
      let cursor = new Date(anchor);
      let pickerMode = period;
      closeDatePicker = (restoreFocus = false) => {
        panel.hidden = true;
        datePickerHost = null;
        picker.setAttribute("aria-expanded", "false");
        if (restoreFocus) picker.focus();
      };
      const choose = (date) => {
        anchor = date;
        closeDatePicker(true);
        render();
      };
      const renderPicker = () => {
        panel.replaceChildren();
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const firstYear = Math.max(2000, Math.min(9988, Math.floor((year - 2000) / 12) * 12 + 2000));
        const shift = (offset) => {
          const next = new Date(cursor);
          next.setDate(1);
          if (pickerMode === "day") next.setMonth(month + offset);
          else next.setFullYear(year + offset * (pickerMode === "year" ? 12 : 1));
          if (next.getFullYear() >= 2000 && next.getFullYear() <= 9999) cursor = next;
          renderPicker();
        };
        const header = element("div", "lst-date-header");
        const heading = button(pickerMode === "day" ? ui.date(cursor, { month: "long", year: "numeric" })
          : pickerMode === "month" ? String(year) : `${firstYear} - ${firstYear + 11}`, () => {
          pickerMode = pickerMode === "day" ? "month" : "year";
          renderPicker();
        }, "Choose month or year");
        heading.className = "lst-date-heading";
        heading.disabled = pickerMode === "year";
        const previous = button("‹", () => shift(-1), "Previous calendar page");
        const following = button("›", () => shift(1), "Next calendar page");
        previous.disabled = pickerMode === "year" ? firstYear === 2000 : year === 2000 && (pickerMode === "month" || month === 0);
        following.disabled = pickerMode === "year" ? firstYear === 9988 : year === 9999 && (pickerMode === "month" || month === 11);
        header.append(previous, heading, following);
        const grid = element("div", `lst-date-grid${pickerMode === "day" ? " lst-date-days" : ""}`);
        const today = new Date();
        const addCell = (label, date, selected, current, action) => {
          const cell = button(label, action, ui.date(date, pickerMode === "day"
            ? { day: "numeric", month: "long", year: "numeric" } : pickerMode === "month" ? { month: "long", year: "numeric" } : { year: "numeric" }));
          cell.className = `lst-date-cell${selected ? " lst-selected" : ""}${current ? " lst-date-today" : ""}`;
          cell.setAttribute("aria-pressed", String(selected));
          if (current) cell.setAttribute("aria-current", "date");
          grid.append(cell);
        };
        if (pickerMode === "day") {
          for (const day of ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]) grid.append(element("span", "lst-date-weekday", day));
          const offset = (new Date(year, month, 1).getDay() + 6) % 7;
          for (let i = 0; i < offset; i++) grid.append(element("span"));
          const days = new Date(year, month + 1, 0).getDate();
          for (let day = 1; day <= days; day++) {
            const date = new Date(year, month, day, 12);
            addCell(String(day), date, dateKey(date) === dateKey(anchor), dateKey(date) === dateKey(today), () => choose(date));
          }
        } else if (pickerMode === "month") {
          for (let i = 0; i < 12; i++) {
            const date = new Date(year, i, 1, 12);
            addCell(ui.date(date, { month: "short" }), date, year === anchor.getFullYear() && i === anchor.getMonth(),
              year === today.getFullYear() && i === today.getMonth(), () => {
                if (period === "month") choose(date);
                else { cursor = date; pickerMode = "day"; renderPicker(); }
              });
          }
        } else {
          for (let i = firstYear; i <= firstYear + 11; i++) {
            const date = new Date(i, 0, 1, 12);
            addCell(String(i), date, i === anchor.getFullYear(), i === today.getFullYear(), () => {
              if (period === "year") choose(date);
              else { cursor = date; pickerMode = "month"; renderPicker(); }
            });
          }
        }
        const current = button(period === "day" ? "Today" : period === "month" ? "This month" : "This year", () => choose(new Date()));
        current.className = "lst-date-current";
        panel.append(header, grid, current);
      };
      const next = button("›", () => move(1), text.next);
      navigation.append(prev, pickerHost, next, button(text.today, () => { closeDatePicker(); anchor = new Date(); render(); }));
      toolbar.append(tabs, navigation);
      const body = element("div");
      view.append(toolbar, body);

      const renderBody = () => {
        const stats = aggregate(data, period, anchor);
        body.replaceChildren();
        const formats = { day: { day: "numeric", month: "long", year: "numeric" }, month: { month: "long", year: "numeric" }, year: { year: "numeric" } };
        body.append(element("h2", "lst-title", ui.date(anchor, formats[period])));
        const cards = element("div", "lst-cards");
        for (const [value, label, icon] of [[duration(stats.ms), text.listeningTime, "time"], [ui.number(stats.plays), text.listens, "plays"],
          [ui.number(stats.tracks.length), text.uniqueTracks, "tracks"], [ui.number(stats.artists.length), text.artists, "artists"]]) {
          const card = element("div", "lst-card");
          card.append(element("strong", "lst-value", value), element("span", "lst-muted", label));
          const decoration = element("span", "lst-card-icon");
          decoration.setAttribute("aria-hidden", "true");
          decoration.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" focusable="false">${cardIcons[icon]}</svg>`;
          card.append(decoration);
          cards.append(card);
        }
        body.append(cards);
        if (!stats.ms) {
          const empty = element("div", "lst-empty");
          empty.append(element("strong", "", text.emptyTitle), element("span", "lst-muted", text.emptyDescription));
          body.append(empty);
        }
        body.append(element("h3", "", period === "day" ? text.hourly : period === "month" ? text.daily : text.monthly));
        const chart = element("div", "lst-chart");
        chart.setAttribute("role", "img");
        const peak = Math.max(1, ...stats.bins);
        const labels = stats.bins.map((value, index) => {
          const label = period === "day" ? `${pad(index)}:00` : period === "month" ? ui.number(index + 1)
            : ui.date(new Date(anchor.getFullYear(), index, 1), { month: "short" });
          const column = element("div", "lst-column");
          column.title = `${label} - ${duration(value)}`;
          const space = element("div", "lst-bar-space");
          const bar = element("div", "lst-bar");
          bar.style.height = `${Math.max(1, value / peak * 100)}%`;
          bar.style.opacity = value ? "1" : ".15";
          if (value > 0) {
            const label = element("span", "lst-bar-label");
            label.setAttribute("aria-hidden", "true");
            label.textContent = ui.chartMinutes(value);
            bar.append(label);
          }
          space.append(bar);
          const axis = period === "year" || index % (period === "day" ? 3 : 5) === 0 || index === stats.bins.length - 1;
          column.append(space, element("span", "lst-axis", axis ? (period === "day" ? String(index) : label) : ""));
          chart.append(column);
          return column.title;
        });
        chart.setAttribute("aria-label", labels.join("; "));
        body.append(chart);
        const lists = element("div", "lst-lists");
        for (const [title, entries, isTrack] of [[text.topTracks, stats.tracks.filter((track) => track.plays > 0), true], [text.topArtists, stats.artists.filter((artist) => artist.ms >= 60000), false]]) {
          const section = element("section");
          section.append(element("h3", "", title));
          if (!entries.length) section.append(element("p", "lst-muted", text.noData));
          entries.slice(0, 10).forEach((entry, index) => {
            const row = element("div", "lst-row");
            const info = element("div", "lst-info");
            const name = element("span", "lst-name", ui.name(entry, isTrack));
            name.title = name.textContent;
            info.append(name);
            if (isTrack) info.append(element("div", "lst-muted lst-subtitle", entry.artists.map((artist) => ui.name(artist, false)).join(", ")));
            const metric = element("div", "lst-metric");
            metric.append(element("div", "", isTrack ? ui.plays(entry.plays) : ui.minutes(entry.ms)));
            row.append(element("span", "lst-rank", ui.number(index + 1)), artworkNode(entry, isTrack), info, metric);
            section.append(row);
          });
          lists.append(section);
        }
        body.append(lists);
      };
      const render = () => {
        for (const [key, tab] of tabButtons) {
          tab.className = period === key ? "lst-selected" : "";
          tab.setAttribute("aria-pressed", String(period === key));
        }
        pickerLabel.textContent = ui.date(anchor, period === "day" ? { day: "numeric", month: "short", year: "numeric" }
          : period === "month" ? { month: "long", year: "numeric" } : { year: "numeric" });
        prev.disabled = anchor.getFullYear() <= 2000 && (period === "year" || (anchor.getMonth() === 0 && (period === "month" || anchor.getDate() === 1)));
        next.disabled = anchor.getFullYear() >= 9999 && (period === "year" || (anchor.getMonth() === 11 && (period === "month" || anchor.getDate() === 31)));
        renderBody();
      };
      render();
      refreshView = renderBody;
      api.PopupModal.display({ title: text.title, content: view, isLarge: true });
    };

    const style = element("style");
    style.id = "listening-stats-style";
    style.textContent = CSS;
    document.head.append(style);
    const icon = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M3 13h4v8H3zm7-10h4v18h-4zm7 6h4v12h-4z"/></svg>';
    const statsButton = new api.Topbar.Button(text.title, icon, show);
    statsButton.button?.setAttribute("data-listening-stats", "");
    const setupTooltip = () => {
      if (!api.Tippy) {
        setTimeout(setupTooltip, 300);
        return;
      }
      const options = {
        content: text.title,
        placement: "bottom",
        delay: [200, 0],
        offset: [0, 8],
        animation: false,
        interactive: false,
        appendTo: () => document.body,
        zIndex: 10000,
        onShow() {},
        onMount(instance) {
          if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
          instance.popper.firstElementChild?.animate([
            { opacity: 0 },
            { opacity: 1 },
          ], { duration: 320, easing: "ease-in-out" });
        },
        onHide() {},
        render(instance) {
          const popper = element("div");
          const tooltip = element("div", "lst-button-tooltip", instance.props.content);
          tooltip.setAttribute("role", "tooltip");
          tooltip.style.cssText = "display:block;background:#181818;color:#fff;padding:5px 9px;border:0;border-radius:4px;font-family:inherit;font-size:12px;font-weight:500;line-height:1.4;white-space:nowrap;box-shadow:0 4px 12px #0009;pointer-events:none;";
          popper.append(tooltip);
          return {
            popper,
            onUpdate(previous, next) { tooltip.textContent = next.content; },
          };
        },
      };
      statsButton.tippy?.destroy();
      statsButton.tippy = api.Tippy(statsButton.element, options);
      statsButton.element?.removeAttribute("title");
      statsButton.button?.removeAttribute("title");
    };
    setupTooltip();
    const statsMenu = new api.Menu.Item(text.title, false, show, icon);
    const exportMenu = new api.Menu.Item(text.export, false, exportData, "download");
    statsMenu.register();
    exportMenu.register();
    api.Player.addEventListener("songchange", () => { sample(); flush(); });
    api.Player.addEventListener("onplaypause", () => { sample(); flush(); });
    sample();
    setInterval(sample, 1000);
    setInterval(flush, 10000);
    setInterval(() => {
      if (view?.isConnected) refreshView();
    }, 5000);
    window.addEventListener("pagehide", () => { sample(); flush(); });
    document.addEventListener("visibilitychange", () => {
      sample();
      if (document.hidden) flush();
    });
    connection.onversionchange = () => { flush(); connection.close(); };
  }

  start().catch((error) => console.error("[Listening Stats] Initialization failed", error));
})();
