import { useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCallCore({
  title,
  subtitle,
  backTo = "/",
  badge = "Secure Call",
}) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Stable random-ish user identity per mount
  const user = useMemo(() => {
    const userId = String(Date.now());
    return {
      userId,
      userName: `Mindgate-${userId.slice(-4)}`,
    };
  }, []);

  useEffect(() => {
    if (!roomId || !containerRef.current) return;

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      alert(
        "Missing ZEGO env vars.\nAdd VITE_ZEGO_APP_ID and VITE_ZEGO_SERVER_SECRET in your .env file."
      );
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user.userId,
      user.userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,
      showPreJoinView: true,

      onLeaveRoom: () => {
        navigate(backTo);
      },
    });

    return () => {
      try {
        zp.destroy();
      } catch (e) {}
    };
  }, [roomId, navigate, backTo, user]);

  return (
    <div className="mg-call">
      {/* Inline theme CSS so you don’t need extra files */}
      <style>{`
        .mg-call{
          min-height:100vh;
          background:
            radial-gradient(900px 500px at 20% 0%, rgba(65, 190, 140, 0.18), transparent 60%),
            radial-gradient(700px 500px at 90% 20%, rgba(15, 185, 165, 0.16), transparent 60%),
            linear-gradient(180deg, #eef7f3 0%, #f7fbf9 55%, #ffffff 100%);
          color:#0b2b20;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif;
          padding: 18px 16px 28px;
        }

        .mg-wrap{
          max-width: 1100px;
          margin: 0 auto;
        }

        .mg-topbar{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(11,43,32,0.08);
          box-shadow: 0 10px 28px rgba(0,0,0,0.06);
          backdrop-filter: blur(10px);
        }

        .mg-left{
          display:flex;
          align-items:center;
          gap: 10px;
          min-width: 0;
        }

        .mg-back{
          appearance:none;
          border: 1px solid rgba(11,43,32,0.14);
          background: rgba(255,255,255,0.85);
          color:#0b2b20;
          padding: 10px 12px;
          border-radius: 14px;
          cursor:pointer;
          transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
          font-weight: 600;
        }
        .mg-back:hover{
          transform: translateY(-1px);
          box-shadow: 0 10px 18px rgba(0,0,0,0.08);
          background: #ffffff;
        }

        .mg-titleBox{
          min-width:0;
        }

        .mg-title{
          margin:0;
          font-size: 18px;
          line-height: 1.15;
          letter-spacing: -0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mg-sub{
          margin: 4px 0 0;
          font-size: 13px;
          opacity: 0.78;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mg-right{
          display:flex;
          align-items:center;
          gap: 10px;
          flex-shrink:0;
        }

        .mg-badge{
          font-size: 12px;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(11,43,32,0.12);
          background: rgba(65, 190, 140, 0.12);
          color: #0b2b20;
          font-weight: 700;
        }

        .mg-room{
          font-size: 12px;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(11,43,32,0.12);
          background: rgba(255,255,255,0.7);
          color: rgba(11,43,32,0.85);
          font-weight: 700;
        }

        .mg-panel{
          margin-top: 14px;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(11,43,32,0.08);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
        }

        .mg-callFrame{
          width: 100%;
          height: calc(100vh - 140px);
          min-height: 520px;
          background: #ffffff;
        }

        /* Small screens */
        @media (max-width: 520px){
          .mg-title{ font-size: 16px; }
          .mg-sub{ display:none; }
          .mg-room{ display:none; }
          .mg-callFrame{ min-height: 520px; height: calc(100vh - 132px); }
        }
      `}</style>

      <div className="mg-wrap">
        <div className="mg-topbar">
          <div className="mg-left">
            <button className="mg-back" onClick={() => navigate(backTo)}>
              ← Back
            </button>

            <div className="mg-titleBox">
              <h2 className="mg-title">{title}</h2>
              <p className="mg-sub">{subtitle}</p>
            </div>
          </div>

          <div className="mg-right">
            <span className="mg-badge">{badge}</span>
            <span className="mg-room">Room: {roomId}</span>
          </div>
        </div>

        <div className="mg-panel">
          <div ref={containerRef} className="mg-callFrame" />
        </div>
      </div>
    </div>
  );
}
