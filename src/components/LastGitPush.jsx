import axios from "axios";

export default async function LastGitPush() {
  try {
    const owner = "cherrydub";
    const repo = "cherrydub98";

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/main`
    );

    const lastPushTime = response.data.commit.author.date;
    // const lastPushMessage = response.data.commit.message;

    return lastPushTime;
  } catch (error) {
    console.error("Error fetching last push time:", error);
    return null;
  }
}
