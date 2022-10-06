import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";
import Head from "next/head";

/* A type definition for the props that will be passed to the component. */
interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);
  return (
    <>
      <Head>
        <title>Streamy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10 videos h-full ">
        {videos.length ? (
          videos?.map((video: Video) => (
            <VideoCard post={video} isShowingOnHome key={video._id} />
          ))
        ) : (
          <NoResults text={`No Videos`} />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string };
}) => {
  let response = null;
  topic
    ? (response = await axios.get(`${BASE_URL}/api/discover/${topic}`))
    : (response = await axios.get(`${BASE_URL}/api/post`));
  return {
    props: {
      videos: response.data
    }
  };
};

export default Home;
