import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={129} height={36} viewBox="0 0 129 36" fill="none" {...props}>
      <Path
        d="M36.164 7.527s-1.634-2.333-4.398-1.46c-3.101.961-3.127 6.495-5.009 8.23l-.195.178c-.788-1.455-2.443-3.143-5.828-4.625-7.884-2.995-9.381-8.277-9.65-9.77-.015-.094-.162-.11-.189-.02-.51 1.508-2.249 7.2-1.277 12.229 1.02 5.23 3.915 8.34 7.384 10.757 0 0-6.974 6.755-16.865 5.504-.126-.016-.189.147-.084.22 1.104.789 5.697 2.902 9.765 3.517 10.27 1.555 20.65-.91 23.83-10.038 2.18-6.26 1.36-9.765 2.338-11.789.2-.405 1.929-2.533 2.302-3.064.052-.074-.01-.173-.1-.163l-2.024.294zM35.955 30.33c.037-.106.19-.106.22 0l.032.104a3.58 3.58 0 002.003 2.192c.089.037.089.168 0 .205a3.551 3.551 0 00-2.003 2.191l-.031.105c-.037.106-.19.106-.221 0l-.032-.105a3.58 3.58 0 00-2.002-2.191c-.09-.037-.09-.168 0-.205a3.551 3.551 0 002.002-2.192l.032-.105z"
        fill="#CCB4FF"
      />
      <Path
        d="M51.387 14.822a17.557 17.557 0 012.372-1.563 14.474 14.474 0 012.524-1.09c0-.232-.064-.48-.184-.737a3.49 3.49 0 00-.473-.72 2.724 2.724 0 00-.601-.546c-.217-.136-.417-.208-.593-.208-.473 0-1.026.216-1.667.649-.64.433-1.338 1.034-2.1 1.81a33.693 33.693 0 00-2.403 2.781 60.376 60.376 0 00-2.548 3.526c.416 1.362.793 2.548 1.138 3.566.336 1.018.665 1.875.977 2.556.313.689.617 1.202.93 1.538.312.337.64.513 1.001.513.177 0 .377-.032.593-.104a3.05 3.05 0 00.617-.28 5.5 5.5 0 00.545-.385c.168-.136.28-.28.353-.44-.457-.305-.906-.714-1.355-1.227a15.957 15.957 0 01-1.25-1.674c-.392-.601-.745-1.226-1.073-1.875a21.495 21.495 0 01-.826-1.82 18.303 18.303 0 011.86-2.307c.68-.721 1.41-1.37 2.163-1.963zM47.1 10.655c-.48-.4-1.01-.657-1.595-.77a80.344 80.344 0 01-.44 2.268 42.59 42.59 0 01-.385 1.635c-.128.497-.288.994-.48 1.507a61.449 61.449 0 01-.722 1.89c-.456 1.178-.857 2.212-1.21 3.094-.344.881-.64 1.634-.897 2.267-.249.633-.465 1.162-.633 1.595-.176.433-.32.777-.449 1.042.288.472.609.865.954 1.177.344.313.785.53 1.314.657.232-1.29.569-2.628 1.001-4.006.433-1.378 1.018-2.9 1.771-4.567.337-.762.65-1.483.962-2.164.304-.68.585-1.298.833-1.85a33.09 33.09 0 01.673-1.427c.2-.393.377-.69.529-.882a5.36 5.36 0 00-1.226-1.466zM72.132 13.908a15.406 15.406 0 00-1.53-4.383c-.345-.64-.713-1.186-1.106-1.61a1.65 1.65 0 00-.569.208c-.2.112-.393.24-.585.385a3.951 3.951 0 00-.497.465c-.144.168-.24.312-.28.44.497.801.913 1.515 1.25 2.148.337.625.6 1.202.801 1.722.2.53.353 1.034.457 1.53.104.498.192 1.018.256 1.571a3.422 3.422 0 00-.961-.64c-.36-.169-.681-.249-.962-.249-.36.08-.729.272-1.106.56a7.992 7.992 0 00-1.113 1.059c-.369.416-.713.881-1.042 1.402-.328.52-.609 1.058-.85 1.602a10.98 10.98 0 00-.584 1.651 6.123 6.123 0 00-.217 1.539c0 .889.249 1.586.762 2.09.504.506 1.242.818 2.195.93.473-.08.946-.288 1.418-.617.473-.328.93-.745 1.363-1.258.44-.512.841-1.097 1.218-1.746.376-.65.705-1.347.985-2.068.289-.729.505-1.474.665-2.235.16-.762.24-1.507.24-2.228 0-.721-.064-1.474-.208-2.268zm-1.755 3.454c0 .817-.12 1.667-.36 2.548s-.561 1.707-.946 2.476a9.806 9.806 0 01-1.314 2.011c-.489.57-.97.938-1.458 1.106-.625-.096-.938-.489-.938-1.186 0-.36.08-.777.233-1.25a9.74 9.74 0 01.625-1.474 17 17 0 01.897-1.539c.337-.512.69-.985 1.058-1.426.376-.44.745-.825 1.122-1.154.376-.336.729-.569 1.057-.705a.611.611 0 01.025.168v.425zM74.786 22.778a17.8 17.8 0 002.331-1.081c.665-.377 1.234-.794 1.7-1.258a4.839 4.839 0 001.073-1.627c.248-.617.4-1.354.457-2.22-.553-.705-1.154-1.105-1.787-1.186-.457 0-.922.104-1.386.313a6.033 6.033 0 00-1.355.85c-.44.36-.849.785-1.226 1.265a10.201 10.201 0 00-1.001 1.547 8.663 8.663 0 00-.665 1.706c-.16.593-.24 1.17-.24 1.74 0 .833.264 1.546.8 2.13.537.594 1.283.938 2.236 1.05.665-.152 1.37-.504 2.116-1.05.745-.544 1.426-1.241 2.05-2.067a3.658 3.658 0 00-.352-.352c-.224.24-.473.497-.76.777-.281.28-.594.545-.914.793a6.18 6.18 0 01-1.034.617c-.36.169-.73.249-1.106.249a.74.74 0 01-.48-.16 1.023 1.023 0 01-.29-.41 1.946 1.946 0 01-.143-.544 4.625 4.625 0 01-.04-.56c0-.097 0-.193.008-.281.008-.072.008-.16.008-.24zm.857-2.58a7.954 7.954 0 01.97-1.458c.352-.417.729-.745 1.137-1.002.401-.248.794-.4 1.162-.457-.056.962-.448 1.843-1.186 2.653-.737.809-1.658 1.498-2.764 2.051.16-.641.385-1.234.681-1.787zM88.832 15.887c-.384-.36-.945-.545-1.666-.545a4.61 4.61 0 00-2.132.529 6.588 6.588 0 00-1.835 1.394 7.03 7.03 0 00-1.29 1.98 5.623 5.623 0 00-.489 2.3 4.786 4.786 0 00.962 2.893c.296.383.649.704 1.05.944.4.24.833.385 1.29.425.232-.04.513-.144.825-.304.313-.16.633-.353.97-.585.336-.233.649-.481.953-.762.305-.28.577-.56.81-.857a.505.505 0 00-.065-.224.494.494 0 00-.144-.185 14.127 14.127 0 01-1.971 1.218c-.32.16-.617.289-.897.385a3.6 3.6 0 01-.73.184c-.496-.224-.745-.897-.745-2.02 0-.889.152-1.738.465-2.547.312-.81.77-1.555 1.362-2.22a5.74 5.74 0 011.21-1.041c.417-.265.761-.393 1.042-.393.32 0 .48.2.48.6 0 .698-.464 1.467-1.394 2.309.112.168.257.304.425.408.176.105.344.16.513.16.192 0 .384-.072.585-.216a2.13 2.13 0 00.513-.577c.144-.232.264-.505.352-.801.088-.296.136-.609.136-.93 0-.649-.192-1.161-.585-1.522zM110.178 16.376a3.646 3.646 0 00-.489-.209 5.866 5.866 0 00-.593-.16 3.12 3.12 0 00-.585-.064 4.695 4.695 0 00-.617.721 7.097 7.097 0 00-.457.761c-.128.249-.24.49-.336.722-.089.232-.161.424-.217.593a6.663 6.663 0 01-.424.913c-.177.305-.361.601-.553.882-.193.28-.385.552-.569.8-.185.25-.353.474-.489.666-.569.777-1.01 1.354-1.33 1.73-.321.377-.585.602-.793.69-.033-.032-.057-.072-.097-.128a.505.505 0 01-.048-.249c0-.176.032-.425.096-.729.065-.305.145-.617.241-.938.096-.32.192-.624.288-.913.096-.288.177-.513.249-.665.625-1.482 1.186-2.62 1.698-3.413.505-.794.826-1.259.946-1.395a1.29 1.29 0 00-.409-.304 5.352 5.352 0 00-.496-.2 2.473 2.473 0 00-.513-.113 3.095 3.095 0 00-.441-.032c-.441.32-.865.761-1.258 1.322s-.753 1.162-1.074 1.811c-.32.641-.601 1.298-.841 1.963a17.783 17.783 0 00-.553 1.787c-.072.289-.112.561-.136.81-.024.248-.032.569-.032.953.056.248.16.473.32.665.16.193.345.36.561.497.216.136.441.248.689.32.241.08.473.12.697.137.097-.016.225-.08.385-.185a3.62 3.62 0 00.513-.456c.112-.137.28-.353.497-.65.224-.288.448-.592.673-.897.224-.304.44-.569.633-.793.192-.225.32-.337.376-.337a2.314 2.314 0 00-.104.754c0 .232.048.52.136.849.088.337.265.609.529.833a5.769 5.769 0 001.09.57c.184.08.361.135.513.175.152.04.28.065.376.065.016 0 .024-.009.04-.024.033-.024.041-.049.041-.065a.57.57 0 00-.073-.248 4.462 4.462 0 01-.152-.36 3.514 3.514 0 01-.232-1.306c0-.546.088-1.098.272-1.667a14.42 14.42 0 01.665-1.715c.265-.577.545-1.162.85-1.755.304-.593.585-1.202.833-1.81a1.45 1.45 0 00-.296-.21zM120.058 16.376a3.538 3.538 0 00-.489-.209 5.726 5.726 0 00-.593-.16c-.208-.04-.4-.064-.585-.064-.24.225-.44.465-.617.721a7.083 7.083 0 00-.456.761 9.133 9.133 0 00-.337.722c-.088.232-.16.424-.216.593a6.672 6.672 0 01-.425.913c-.176.305-.36.601-.553.882-.192.28-.384.552-.569.8-.184.25-.352.474-.488.666-.569.777-1.01 1.354-1.331 1.73-.32.377-.585.602-.793.69-.024-.032-.056-.072-.096-.128-.04-.056-.056-.137-.056-.249 0-.176.032-.425.096-.729.064-.305.144-.617.24-.938.097-.32.193-.624.289-.913.096-.288.176-.513.248-.665.625-1.482 1.186-2.62 1.699-3.413.505-.794.817-1.259.946-1.395a1.313 1.313 0 00-.409-.304 5.371 5.371 0 00-.497-.2 2.445 2.445 0 00-.513-.113 3.073 3.073 0 00-.44-.032c-.441.32-.866.761-1.258 1.322-.393.561-.754 1.162-1.074 1.811a19.058 19.058 0 00-1.394 3.75c-.073.289-.113.561-.137.81-.024.248-.032.569-.032.953.056.248.161.473.321.665.16.193.344.36.561.497.216.136.44.248.689.32.24.08.473.12.697.137.096-.016.224-.08.385-.185.16-.112.328-.264.512-.456.113-.137.281-.353.497-.65.225-.288.449-.592.673-.897.233-.304.441-.569.633-.793.193-.225.321-.337.377-.337a2.314 2.314 0 00-.104.754c0 .232.048.52.136.849.088.337.264.609.529.833.152.096.312.193.481.289a2.859 2.859 0 00-.497.545 2.99 2.99 0 00-.481.977c-.096.345-.128.697-.096 1.05.032.352.136.689.304 1.01.096.096.217.176.353.24a1.877 1.877 0 00.889.16c.145-.016.273-.048.385-.104.609-.44.977-.978 1.106-1.61.128-.634 0-1.29-.377-1.964a2.5 2.5 0 01-.128-.248h-.024c-.024-.072-.056-.144-.08-.233a4.507 4.507 0 01-.161-.528 3.514 3.514 0 01-.072-.762c0-.544.088-1.097.273-1.666.176-.57.4-1.138.665-1.715.264-.577.545-1.162.849-1.755a23.03 23.03 0 00.834-1.81c-.041-.065-.145-.145-.289-.225zm-2.42 10.529a3.324 3.324 0 01-.16.793c-.08.256-.192.48-.337.673a.574.574 0 01-.48-.312c-.072-.137-.105-.337-.097-.585.008-.249.049-.513.113-.794.064-.28.16-.537.28-.769.12-.24.249-.417.385-.545.112.225.192.465.24.73.064.272.072.536.056.809zM127.63 20.983c.168-.544.368-1.105.601-1.698.232-.585.497-1.178.769-1.755 0-.072-.048-.144-.152-.232a2.125 2.125 0 00-.385-.24 2.257 2.257 0 00-.513-.185 1.994 1.994 0 00-.489-.072c-.152.32-.312.649-.488.985l-.529 1.01c-.176.329-.361.649-.529.954-.176.304-.329.584-.465.833-.753 1.266-1.386 2.195-1.915 2.796-.529.601-.993.946-1.394 1.034-.192-.072-.289-.232-.289-.497 0-.64.153-1.322.457-2.051a9.636 9.636 0 011.178-2.067 8.494 8.494 0 011.603-1.651c.585-.457 1.162-.73 1.714-.81a1.152 1.152 0 00-.184-.448 2.93 2.93 0 00-.409-.505 3.484 3.484 0 00-.496-.433 1.578 1.578 0 00-.465-.248c-.569 0-1.162.248-1.771.745a9.285 9.285 0 00-1.699 1.851 11.153 11.153 0 00-1.282 2.404c-.336.865-.497 1.683-.497 2.468 0 .721.161 1.322.481 1.787.321.465.737.697 1.25.697.321-.056.665-.216 1.05-.489a6.749 6.749 0 001.138-1.041c.376-.433.745-.922 1.106-1.483.36-.56.681-1.154.953-1.795-.529 1.37-.793 2.452-.793 3.245 0 1.026.376 1.539 1.122 1.539.208 0 .44-.032.705-.104.264-.072.481-.16.641-.273a.934.934 0 01-.417-.553 3.27 3.27 0 01-.128-.97c0-.344.048-.752.136-1.225a13.5 13.5 0 01.385-1.523zM100.048 16.376a3.54 3.54 0 00-.488-.208 4.266 4.266 0 00-.593-.152c-.209-.04-.4-.064-.585-.064a4.74 4.74 0 00-.617.72 7.079 7.079 0 00-.457.762c-.128.248-.24.489-.337.721-.088.233-.16.425-.216.593-.064.184-.104.273-.216.593-.136.136-.978 1.146-1.803 1.242-.553.064-.801-.457-.978-.777.457-1.002.874-1.803 1.258-2.412.505-.793.826-1.258.946-1.394a1.297 1.297 0 00-.409-.305 5.33 5.33 0 00-.497-.2 2.457 2.457 0 00-.512-.112 3.07 3.07 0 00-.441-.032c-.44.32-.865.76-1.258 1.322a13.82 13.82 0 00-1.074 1.81c-.32.642-.6 1.299-.841 1.964-.24.665-.425 1.266-.553 1.787-.072.288-.256 1.202-.256 1.835v.176c0 .072-.017.144.008.208.296.665.769 1.218 1.017 1.363.096-.056.209-.153.337-.28.056-.057.112-.121.168-.193l.096-.12c.152-.2.353-.674.601-1.427 0-.008.008-.016.008-.024.088-.256.176-.537.273-.857.048-.16.32-1.154.416-1.45.064-.193.12-.345.168-.481.233.272.57.585.97.72.793.281 1.755-.52 1.755-.52l-.393 1.13a2.292 2.292 0 00-.104.745c0 .232.048.52.136.85.088.336.265.608.53.833a5.722 5.722 0 001.089.569c.184.072.36.136.513.176.152.04.28.064.376.064.016 0 .024-.008.04-.024.024-.024.04-.048.04-.064a.566.566 0 00-.072-.248 3.905 3.905 0 01-.305-.905 3.506 3.506 0 01-.071-.762c0-.545.088-1.098.272-1.667.176-.569.4-1.138.665-1.715.265-.576.545-1.161.85-1.754.304-.593.585-1.202.833-1.811a1.044 1.044 0 00-.289-.225zM61.532 21.985c-.32 1.01-.641 1.939-.954 2.764-.32.834-.657 1.603-1.017 2.3-.36.697-.745 1.346-1.162 1.94a15.242 15.242 0 01-1.37 1.674c-.641.665-1.299 1.178-1.98 1.53-.68.353-1.362.53-2.035.53-.344 0-.689-.041-1.034-.113a5.777 5.777 0 01-.953-.313 4.199 4.199 0 01-.793-.456 1.622 1.622 0 01-.49-.553c0-.169.097-.313.29-.44.168.151.304.271.416.352.112.08.216.152.32.208a.97.97 0 00.337.104c.12.016.257.024.409.024.793 0 1.562-.232 2.324-.697.753-.465 1.466-1.122 2.139-1.98.673-.849 1.29-1.882 1.843-3.1.553-1.21 1.025-2.572 1.418-4.07-.184.28-.4.616-.665 1.017-.264.4-.553.801-.873 1.194-.32.393-.65.753-.986 1.066-.337.32-.673.528-.986.64-.224 0-.456-.04-.697-.112a2.86 2.86 0 01-.689-.328 2.278 2.278 0 01-.569-.505 1.487 1.487 0 01-.336-.673c0-.4.016-.721.04-.97.024-.24.072-.512.144-.8.128-.53.313-1.123.553-1.788.24-.665.529-1.322.85-1.963.328-.649.688-1.25 1.081-1.81.393-.562.81-1.002 1.242-1.323.112 0 .248.008.417.032.168.024.336.056.52.112.177.056.353.12.521.2.169.08.313.177.441.305-.152.136-.489.601-1.001 1.394-.513.794-1.082 1.931-1.707 3.414a6.558 6.558 0 00-.249.665c-.096.288-.192.593-.28.913-.088.32-.168.633-.24.938a3.28 3.28 0 00-.105.73c0 .111.016.191.049.248a.59.59 0 00.096.128c.248-.04.585-.249 1.001-.617.417-.369.89-.938 1.419-1.715.336-.497.64-.994.913-1.49.28-.49.553-.986.825-1.49l.842-1.54c.288-.528.6-1.065.937-1.626.177 0 .377.024.585.064.209.04.409.096.601.152.192.064.36.129.513.209.144.08.256.152.32.24a83.349 83.349 0 00-1.21 2.684c-.4.89-.737 1.787-1.025 2.7z"
        fill="#705B9E"
      />
      <Path
        d="M50.171 31.494c-.28-.158-.243-.542.01-.741 1.06-.835 4.29-2.958 11.666-4.954l.328.353S52.76 29.15 50.517 31.48c-.09.108-.22.085-.346.014z"
        fill="#705B9E"
      />
      <Path
        d="M3.585 15.474c.03-.087.158-.087.184 0l.026.088a2.978 2.978 0 001.666 1.822c.074.031.074.14 0 .171a2.954 2.954 0 00-1.666 1.823l-.026.088c-.03.087-.157.087-.184 0l-.026-.088a2.979 2.979 0 00-1.666-1.823c-.074-.03-.074-.14 0-.17A2.954 2.954 0 003.56 15.56l.026-.087zM45.022 3.974c.029-.083.148-.083.173 0l.025.082a2.81 2.81 0 001.571 1.72c.07.029.07.132 0 .16a2.81 2.81 0 00-1.571 1.72l-.025.083c-.029.083-.148.083-.173 0l-.025-.082a2.81 2.81 0 00-1.571-1.72c-.07-.029-.07-.132 0-.161a2.787 2.787 0 001.571-1.72l.025-.082z"
        fill="#CCB4FF"
      />
    </Svg>
  );
}

export default SvgComponent;
