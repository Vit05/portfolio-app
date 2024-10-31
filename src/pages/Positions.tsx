import {PortfolioPositionWrapper} from "../components/PortfolioPositionWrapper";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {useEffect} from "react";
import {fetchAssets} from "../slices/assetsSlice";

export const Positions = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { items: assets, loading: assetsLoading, error: assetsError } = useSelector((state: RootState) => state.assets);

    useEffect(() => {
        if (!assets.length && !assetsLoading) dispatch(fetchAssets());
    }, [dispatch, assets]);

    return (
            <>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Positions</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {assetsError?
                                <p className="text-red-500">{assetsError}</p> :
                                <PortfolioPositionWrapper assets={assets} isChartView={false}/>}
                    </div>
                </main>
            </>
    );
};

