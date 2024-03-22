/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Akanksha
 *      Student ID: 155514227
 *      Date:       03/05/2024
 */

// Create local variables to work with it in this file.
const { artists, songs } = window;

console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", function () {
  // Get elements from the DOM
  const menu = document.querySelector("#menu");
  const selectedArtist = document.querySelector("#selected-artist");
  const cards = document.querySelector("#cards");

  // Function to create buttons for each artist
  function createArtistButtons() {
    // Iterate through the array of artists
    artists.forEach((artist) => {
      // Create a new button element
      const button = document.createElement("button");

      // Set the button text content to the artist's name
      button.textContent = artist.name;

      // Add a click event listener to the button. When clicked, call the function to show songs
      button.addEventListener("click", function () {
        showSongsForArtist(artist);
      });
      // Append the button to the menu
      menu.appendChild(button);
    });
  }

  // Function to show a list of songs for a chosen artist
  /**
   * Displays songs for a given artist.
   *
   * @param {Object} artist - The artist object containing name and urls.
   */
  function showSongsForArtist(artist) {
    // Update the text of the Selected Artist above your table
    selectedArtist.innerHTML = ""; // Clear previous content

    // Artist name with clickable links in brackets
    const artistInfo = document.createElement("span");

    // Update the selected artist title and links
    artistInfo.innerHTML = `${artist.name} (${artist.urls
      .map((url) => createClickableLink(url.url, url.name))
      .join(", ")})`;

    // Append the artist information
    selectedArtist.appendChild(artistInfo);

    // Clear current song rows
    cards.innerHTML = "";

    // Filter songs for the chosen artist and non-flagged, non-explicit songs
    const artistSongs = songs.filter(
      (song) => song.artistId === artist.artistId && !song.flagged && !song.explicit
    );

    // Loop over the filtered songs and add them to the table
    artistSongs.forEach((song) => {
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Add a click handler to log the song when clicked
      card.addEventListener("click", () => console.log(song));

      // Create image element for card
      const card_img = document.createElement("img");
      card_img.src = song.imageUrl;
      card_img.classList.add("card_img");

      //Make card clickable
      const card_url = document.createElement("a");
      card_url.classList.add("card_url");
      card_url.href = song.url;
      card_url.target = "_blank";

      //Card song Title
      const card_title = document.createElement("h3");
      card_title.classList.add("card_title");
      card_title.textContent = song.title;
      //card song duration
      const card_duration = document.createElement("span");
      card_duration.classList.add("card_duration");
      card_duration.textContent = formatDuration(song.duration);
      //card song year
      const card_year = document.createElement("time");
      card_year.classList.add("card_year");
      card_year.textContent = song.year;

      card_url.appendChild(card);
const br = document.createElement("br");
      // Append the image, title, duration, and year elements to the card_url

      card.appendChild(card_img);
      card.appendChild(card_title);
      card.appendChild(card_year);
      card.appendChild(br);
      card.appendChild(card_duration);
      

      // Append the card to the container
      cards.appendChild(card_url);

      // // Make the song's title a clickable link to the URL
      // const namesLink = document.createElement("a");
      // namesLink.href = song.url;
      // namesLink.textContent = song.title;
      // namesLink.artistInfo = artist.artistInfo; //
      // namesLink.target = "_blank"; // Open the link in a new tab

      // // Append the link to the td element
      // nameTd.appendChild(namesLink);

      // const yearTd = document.createElement("td");
      // yearTd.textContent = song.year;

      // const durationTd = document.createElement("td");
      // durationTd.textContent = formatDuration(song.duration);

      // // Append td elements to the row
      // row.appendChild(nameTd);
      // row.appendChild(yearTd);
      // row.appendChild(durationTd);

      // // Append the row to the table body
      // songsTableBody.appendChild(row);
    });
  }
  // Function to format duration from seconds to mm:ss
  function formatDuration(seconds) {
    // Rounding down to the nearest whole number using Math.floor().
    const minutes = Math.floor(seconds / 60);
    // The remaining seconds after removing the minutes.
    const remainingSeconds = seconds % 60;
    // The seconds part is displayed with two digits, adding a leading zero if necessary.
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // Function to create clickable link
  function createClickableLink(url, text) {
    return `<a href="${url}" target="_blank">${text}</a>`;
  }

  // Call the function to create artist buttons on page load
  createArtistButtons();

  // Show default songs for the first artist
  if (artists.length > 0) {
    showSongsForArtist(artists[0]);
  }
});
