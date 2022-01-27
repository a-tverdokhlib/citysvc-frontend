import React from 'react'
import AppBreadcrumb from 'components/layout-components/AppBreadcrumb';
import IntlMessage from '../util-components/IntlMessage';

export const PageHeader = ({ title, display, trans = true }) => {
	return (
		display ? (
			<div className="app-page-header">
				<h3 className="mb-0 mr-3 font-weight-semibold">
					{trans ?
						<IntlMessage id={title ? title : 'home'} /> :
						title ? title : 'home'
					}
				</h3>
				<AppBreadcrumb />
			</div>
		)
			: null
	)
}

export default PageHeader