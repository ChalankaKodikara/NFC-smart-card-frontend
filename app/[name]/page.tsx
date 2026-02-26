import { notFound } from "next/navigation";
import PersonalSection from "./components/PersonalSection";
import SocialMediaSection from "./components/SocialMediaSection";
import AnimatedBackground from "./components/AnimatedBackground";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "../../components/Footer";

/* ================= FETCH PROFILE ================= */

async function getProfile(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
}

/* ================= PAGE ================= */

export default async function PublicProfile({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params; // ✅ NO await

  const profile = await getProfile(name);

  if (!profile) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#ffffff] overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <PersonalSection
          name={profile.personal?.name ?? ""}
          slogan={profile.personal?.slogan ?? ""}
          bio={profile.personal?.bio ?? ""}
          profileImage={
            profile.personal?.profileImage
              ? `${process.env.NEXT_PUBLIC_API_URL}${profile.personal.profileImage}`
              : undefined
          }
        />

        {profile.social?.links?.length > 0 && (
          <div className="mt-4">
            <SocialMediaSection links={profile.social.links} />
          </div>
        )}

        <ExperienceSection slug={name} />
        <ContactSection slug={name} />

        <Footer />
      </div>
    </div>
  );
}
