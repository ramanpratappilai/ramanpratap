// ---------- DOM Elements ----------
const input = document.getElementById("avatarInput");
const removeBtn = document.getElementById("removeAvatar");
const headerImg = document.getElementById("avatarImg");
const headerInitials = document.getElementById("avatarInitials");
const profileImg = document.getElementById("profileAvatarImg");
const profileInitials = document.getElementById("profileAvatarInitials");

// ---------- Avatar Functions ----------
function setHeaderAvatar(dataUrl) {
  if (!headerImg || !headerInitials) return;
  if (dataUrl) {
    headerImg.src = dataUrl;
    headerImg.style.display = "block";
    headerInitials.style.display = "none";
  } else {
    headerImg.src = "";
    headerImg.style.display = "none";
    headerInitials.style.display = "flex";
  }
}

function setProfileAvatar(dataUrl) {
  if (!profileImg || !profileInitials) return;
  if (dataUrl) {
    profileImg.src = dataUrl;
    profileImg.style.display = "block";
    profileInitials.style.display = "none";
  } else {
    profileImg.src = "";
    profileImg.style.display = "none";
    profileInitials.style.display = "flex";
  }
}

// load saved avatar if present
const saved = localStorage.getItem("portfolioAvatar");
if (saved) {
  setHeaderAvatar(saved);
  setProfileAvatar(saved);
  if (removeBtn) removeBtn.style.display = "inline-block";
}

if (input) {
  input.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return alert("Please select an image file");
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      localStorage.setItem("portfolioAvatar", dataUrl);
      setHeaderAvatar(dataUrl);
      setProfileAvatar(dataUrl);
      if (removeBtn) removeBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  });
}

if (removeBtn) {
  removeBtn.addEventListener("click", () => {
    localStorage.removeItem("portfolioAvatar");
    setHeaderAvatar(null);
    setProfileAvatar(null);
    removeBtn.style.display = "none";
  });
}

// ---------- Misc ----------
document.getElementById("year").textContent = new Date().getFullYear();
