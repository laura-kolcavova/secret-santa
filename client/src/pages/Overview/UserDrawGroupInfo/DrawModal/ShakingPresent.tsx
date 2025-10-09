import { Component } from 'solid-js';

export const ShakingPresent: Component = () => {
  return (
    <>
      <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
              20%, 40%, 60%, 80% { transform: translateX(2px); }
            }
            .shake-animation {
              animation: shake 0.6s ease-in-out infinite;
            }
          `}</style>

      <div class="w-64 h-64 mx-auto -m-10">
        <img
          src="/images/present.png"
          alt="present"
          draggable="false"
          class="w-full h-full object-contain shake-animation pointer-events-none"
        />
      </div>
    </>
  );
};
