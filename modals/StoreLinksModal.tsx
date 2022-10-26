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
    (store) => store.closeStoreLinksModal
  );

  return (
    <AutoHeightModal visible={visible} onClose={closeStoreLinksModal}>
      <StoreLinksList urls={storeLinksModalUrls} />
    </AutoHeightModal>
  );
};
