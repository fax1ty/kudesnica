import { useGlobalStore } from "../stores/global";
import { AutoHeightModal } from "./AutoHeightModal";
import { StoreLinksList } from "../components/StoreLinksList";

interface Props {
  visible: boolean;
}

export const StoreLinksModal = ({ visible }: Props) => {
  const storeLinksModalUrls = useGlobalStore(
    (state) => state.storeLinksModalUrls
  );
  const closeStoreLinksModal = useGlobalStore(
    (state) => state.closeStoreLinksModal
  );

  return (
    <AutoHeightModal visible={visible} onClose={closeStoreLinksModal}>
      <StoreLinksList
        onLinkPress={() => closeStoreLinksModal()}
        urls={storeLinksModalUrls}
      />
    </AutoHeightModal>
  );
};
