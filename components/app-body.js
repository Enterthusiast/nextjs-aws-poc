import ScBody from '../styles/sc-body.js'

const AppBody = function(WrappedComponent) {
	return class Higher extends React.Component {
		static async getInitialProps(ctx) {
			return WrappedComponent.getInitialProps(ctx)
        }

        render() {
            return(
                <ScBody>
                    <WrappedComponent {...this.props}/>
                </ScBody>
            )
        }
	}
}

export default AppBody