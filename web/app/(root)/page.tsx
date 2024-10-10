import BackDropCardContainer from "@/components/common/BackDropCard/BackDropCardContainer";
import LandScapeCard from "@/components/common/BackDropCard/LandScapeCard";

export default function Home() {
  return (
    <>
      <BackDropCardContainer title="What's On Now" description="Live TV">
        {Array.from({ length: 10 }, (_, i) => (
          <LandScapeCard key={i} />
        ))}
      </BackDropCardContainer>
    </>
  );
}
